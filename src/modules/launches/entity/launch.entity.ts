export interface LaunchEntity {
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
  launchLibraryId: string | null;
  id: string;
}

export interface Fairings {
  reused: boolean;
  recoveryAttempt: boolean;
  recovered: boolean;
  ships: string[];
}

export interface PatchLinks {
  small: string;
  large: string;
}

export interface RedditLinks {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

interface FlickrLinks {
  small: string[];
  original: string[];
}

export interface Links {
  patch: PatchLinks;
  reddit: RedditLinks;
  flickr: FlickrLinks;
  presskit: string | null;
  webcast: string;
  youtubeId: string;
  article: string;
  wikipedia: string;
}

export interface Failure {
  time: number;
  altitude: number;
  reason: string;
}

export interface Core {
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
