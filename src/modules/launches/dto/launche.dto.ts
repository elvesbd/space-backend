export class LaunchDto {
  id: string;
  fairings: Fairings;
  links: Links;
  staticFireDateUtc: string;
  staticFireDateUnix: number;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: Failure[];
  details: string;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flightNumber: number;
  name: string;
  dateUtc: string;
  dateUnix: number;
  dateLocal: string;
  datePrecision: string;
  upcoming: boolean;
  cores: Core[];
  autoUpdate: boolean;
  tbd: boolean;
}

class Fairings {
  reused: boolean;
  recoveryAttempt: boolean;
  recovered: boolean;
  ships: string[];
}

class PatchLinks {
  small: string;
  large: string;
}

class RedditLinks {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

class FlickrLinks {
  small: string[];
  original: string[];
}

class Links {
  patch: PatchLinks;
  reddit: RedditLinks;
  flickr: FlickrLinks;
  presskit: string | null;
  webcast: string;
  youtubeId: string;
  article: string;
  wikipedia: string;
}

class Failure {
  time: number;
  altitude: number;
  reason: string;
}

class Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landingAttempt: boolean;
  landingSuccess: boolean | null;
  landingType: string | null;
  landpad: string | null;
}
