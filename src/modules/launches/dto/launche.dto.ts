import { ApiProperty } from '@nestjs/swagger';

class Fairings {
  @ApiProperty()
  reused: boolean;

  @ApiProperty()
  recoveryAttempt: boolean;

  @ApiProperty()
  recovered: boolean;

  @ApiProperty()
  ships: string[];
}

class PatchLinks {
  @ApiProperty()
  small: string;

  @ApiProperty()
  large: string;
}

class RedditLinks {
  @ApiProperty()
  campaign: string | null;

  @ApiProperty()
  launch: string | null;

  @ApiProperty()
  media: string | null;

  @ApiProperty()
  recovery: string | null;
}

class FlickrLinks {
  @ApiProperty()
  small: string[];

  @ApiProperty()
  original: string[];
}

class Links {
  @ApiProperty()
  patch: PatchLinks;

  @ApiProperty()
  reddit: RedditLinks;

  @ApiProperty()
  flickr: FlickrLinks;

  @ApiProperty()
  presskit: string | null;

  @ApiProperty()
  webcast: string;

  @ApiProperty()
  youtubeId: string;

  @ApiProperty()
  article: string;

  @ApiProperty()
  wikipedia: string;
}

class Failure {
  @ApiProperty()
  time: number;

  @ApiProperty()
  altitude: number;

  @ApiProperty()
  reason: string;
}

class Core {
  @ApiProperty()
  core: string;

  @ApiProperty()
  flight: number;

  @ApiProperty()
  gridfins: boolean;

  @ApiProperty()
  legs: boolean;

  @ApiProperty()
  reused: boolean;

  @ApiProperty()
  landingAttempt: boolean;

  @ApiProperty()
  landingSuccess: boolean | null;

  @ApiProperty()
  landingType: string | null;

  @ApiProperty()
  landpad: string | null;
}

export class LaunchDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fairings: Fairings;

  @ApiProperty()
  links: Links;

  @ApiProperty()
  staticFireDateUtc: string;

  @ApiProperty()
  staticFireDateUnix: number;

  @ApiProperty()
  net: boolean;

  @ApiProperty()
  window: number;

  @ApiProperty()
  rocket: string;

  @ApiProperty()
  success: boolean;

  @ApiProperty({ type: [Failure] })
  failures: Failure[];

  @ApiProperty()
  details: string;

  @ApiProperty()
  crew: string[];

  @ApiProperty()
  ships: string[];

  @ApiProperty()
  capsules: string[];

  @ApiProperty()
  payloads: string[];

  @ApiProperty()
  launchpad: string;

  @ApiProperty()
  flightNumber: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  dateUtc: string;

  @ApiProperty()
  dateUnix: number;

  @ApiProperty()
  dateLocal: string;

  @ApiProperty()
  datePrecision: string;

  @ApiProperty()
  upcoming: boolean;

  @ApiProperty({ type: [Core] })
  cores: Core[];

  @ApiProperty()
  autoUpdate: boolean;

  @ApiProperty()
  tbd: boolean;

  @ApiProperty()
  launchLibraryId: string;
}
