import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Launch } from '../schemas';
import {
  FiltersDto,
  LaunchDto,
  LaunchesResponseDto,
} from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { LaunchMapper } from '../mappers/launch.mapper';

@Injectable()
export class MongooseRepositoryService implements LaunchesRepository {
  constructor(
    @InjectModel(Launch.name)
    private readonly launchModel: Model<Launch>,
  ) {}

  private logger = new Logger(MongooseRepositoryService.name);

  async getAll(filtersDto: FiltersDto): Promise<LaunchesResponseDto> {
    const { search, limit, page = 1 } = filtersDto;

    const perPage = limit || 10;
    const query = search ? { name: { $regex: new RegExp(search, 'i') } } : {};
    const totalDocsQuery = this.launchModel.countDocuments(query);
    const totalDocs = await totalDocsQuery.exec();
    const totalPages = Math.ceil(totalDocs / perPage);
    const skip = (page - 1) * perPage;

    const launches = await this.launchModel
      .find(query)
      .skip(skip)
      .limit(perPage)
      .exec();

    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      results: launches,
      totalDocs,
      page,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async getOne(id: string): Promise<Launch | null> {
    return this.launchModel.findOne({ id });
  }

  async create(launches: LaunchDto[]): Promise<void> {
    for (const launch of launches) {
      const document = LaunchMapper.toPersistence(launch);
      await this.launchModel.create(document);
    }
  }

  async saveLatestData(launch: LaunchDto): Promise<void> {
    const existingLaunch = await this.getOne(launch.id);
    if (existingLaunch) {
      this.logger.log(`O lançamento ${launch.id} já existe na base de dados!`);
    } else {
      await this.launchModel.create(launch);
      this.logger.log('Lançamento salvo com sucesso!');
    }
  }
}
