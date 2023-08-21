import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Launch } from '../schemas';
import {
  FiltersDto,
  LaunchesResponseDto,
  YearlyRocketCountResponseDto,
} from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { LaunchMapper } from '../mappers/launch.mapper';
import { ExternaLaunchDto } from '../../http/dto';

@Injectable()
export class MongooseRepositoryService implements LaunchesRepository {
  constructor(
    @InjectModel(Launch.name)
    private readonly launchModel: Model<Launch>,
  ) {}

  private logger = new Logger(MongooseRepositoryService.name);

  async getAll(): Promise<Launch[]> {
    return await this.launchModel.find().exec();
  }

  async getOne(id: string): Promise<Launch | null> {
    return await this.launchModel.findOne({ _id: id }).exec();
  }

  async getAllWithFilters(
    filtersDto: FiltersDto,
  ): Promise<LaunchesResponseDto> {
    const { search, limit, page = 1 } = filtersDto;

    const perPage = limit || 10;
    const query = search ? { rocket: { $regex: new RegExp(search, 'i') } } : {};
    const totalDocs = await this.countDocuments(query);
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

  async countDocuments(query: Record<string, any>): Promise<number> {
    return this.launchModel.countDocuments(query).exec();
  }

  async create(launches: ExternaLaunchDto[]): Promise<void> {
    for (const launch of launches) {
      const { id, ...document } = LaunchMapper.toPersistence(launch);
      await this.launchModel.create({ _id: id, ...document });
    }
  }

  async saveLatestLaunch(launch: ExternaLaunchDto): Promise<void> {
    const existingLaunch = await this.getOne(launch.id);
    if (existingLaunch) {
      this.logger.log(`O lançamento ${launch.id} já existe na base de dados!`);
    } else {
      const document = LaunchMapper.toPersistence(launch);
      await this.launchModel.create(document);
      this.logger.log('Lançamento salvo com sucesso!');
    }
  }
}
