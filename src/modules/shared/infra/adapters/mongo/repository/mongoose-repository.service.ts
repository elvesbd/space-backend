import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Launch } from '../schemas';
import {
  FiltersDto,
  LaunchesResponseDto,
} from 'src/modules/rocket-launches/dto';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import { LaunchMapper } from '../mappers/launch.mapper';
import { CreateRocketLaunchDto } from 'src/modules/rocket-launches/application/domain/dtos';

@Injectable()
export class MongooseRepositoryService implements LaunchesRepository {
  constructor(
    @InjectModel(Launch.name)
    private readonly launchModel: Model<Launch>,
  ) {}

  private logger = new Logger(MongooseRepositoryService.name);

  async getAllLaunches(): Promise<Launch[]> {
    const query = { success: { $ne: null } };
    return await this.launchModel.find(query).exec();
  }

  async getAllLaunchesWithFilters(
    filtersDto: FiltersDto,
  ): Promise<LaunchesResponseDto> {
    const { search, limit, page = 1 } = filtersDto;

    const perPage = limit || 5;
    const query = this.buildQuery(search);

    const totalDocs = await this.countDocumentsByQuery(query);
    const totalPages = Math.ceil(totalDocs / perPage);
    const skip = (page - 1) * perPage;

    const launches = await this.launchModel
      .find(query)
      .sort({ flightNumber: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();

    const mappedLaunches = LaunchMapper.toDto(launches);

    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      results: mappedLaunches,
      totalDocs,
      page,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async countDocumentsByQuery(query: Record<string, any>): Promise<number> {
    return this.launchModel.countDocuments(query).exec();
  }

  async createLaunch(launch: CreateRocketLaunchDto): Promise<void> {
    await this.launchModel.create(launch);
  }

  async saveLatestLaunch(launch: CreateRocketLaunchDto): Promise<void> {
    await this.launchModel.create(launch);
  }

  private buildQuery(search: string): any {
    if (
      search &&
      (search.toLowerCase() === 'sucesso' ||
        search.toUpperCase() === 'SUCCESS0')
    ) {
      return { success: true };
    } else if (
      search &&
      (search.toLowerCase() === 'falha' || search.toUpperCase() === 'FALHA')
    ) {
      return { success: false };
    } else if (search) {
      return {
        $text: {
          $search: search,
        },
        success: { $ne: null },
      };
    } else {
      return { success: { $ne: null } };
    }
  }
}
