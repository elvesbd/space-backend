import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FiltersDto,
  LaunchDto,
  LaunchesResponseDto,
} from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { Launch } from '../schemas';
import { Model } from 'mongoose';

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

    const results = launches.map((launch) => ({
      id: launch._id,
      fairings: {
        reused: launch.fairings.reused,
        recoveryAttempt: launch.fairings.recovery_attempt,
        recovered: launch.fairings.recovered,
        ships: launch.fairings.ships,
      },
      links: {
        patch: launch.links.patch,
        reddit: launch.links.reddit,
        flickr: launch.links.flickr,
        presskit: launch.links.presskit,
        webcast: launch.links.webcast,
        youtubeId: launch.links.youtube_id,
        article: launch.links.article,
        wikipedia: launch.links.wikipedia,
      },
      staticFireDateUtc: launch.staticFireDateUtc,
      staticFireDateUnix: launch.staticFireDateUnix,
      net: launch.net,
      window: launch.window,
      rocket: launch.rocket,
      success: launch.success,
      failures: launch.failures,
      details: launch.details,
      crew: launch.crew,
      ships: launch.ships,
      capsules: launch.capsules,
      payloads: launch.payloads,
      launchpad: launch.launchpad,
      flightNumber: launch.flightNumber,
      name: launch.name,
      dateUtc: launch.dateUtc,
      dateUnix: launch.dateUnix,
      dateLocal: launch.dateLocal,
      datePrecision: launch.datePrecision,
      upcoming: launch.upcoming,
      cores: launch.cores.map((core) => ({
        core: core.core,
        flight: core.flight,
        gridfins: core.gridfins,
        legs: core.legs,
        reused: core.reused,
        landingAttempt: core.landing_attempt,
        landingSuccess: core.landing_success,
        landingType: core.landing_type,
        landpad: core.landpad,
      })),
      autoUpdate: launch.autoUpdate,
      tbd: launch.tbd,
    }));

    return {
      results,
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
      await this.launchModel.create(launch);
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
