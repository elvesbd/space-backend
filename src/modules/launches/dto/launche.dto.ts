export class LaunchDto {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
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
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  id: string;
}

class Fairings {
  reused: boolean;
  recovery_attempt: boolean;
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
  youtube_id: string;
  article: string;
  wikipedia: string;
}

class Failure {
  time: number;
  altitude: string | null;
  reason: string;
}

class Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}
