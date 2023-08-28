export class ExternaLaunchDto {
  id: string;
  links: Links;
  fairings: Fairings;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  net: boolean;
  window: number;
  rocket: string; // pegar nome do foguete
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
  date_local: string;
  date_unix: number;
  date_utc: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string;
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
  webcast: string;
  patch: PatchLinks;
  reddit: RedditLinks;
  flickr: FlickrLinks;
  youtube_id: string;
  presskit: string | null;
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
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}
