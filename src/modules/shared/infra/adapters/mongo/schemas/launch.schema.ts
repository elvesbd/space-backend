// launch.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Launch extends Document {
  @Prop()
  fairings: {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ships: string[];
  };

  @Prop()
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      campaign: string;
      launch: string;
      media: string;
      recovery: string;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  };

  @Prop()
  static_fire_date_utc: Date;

  @Prop()
  static_fire_date_unix: number;

  @Prop()
  net: boolean;

  @Prop()
  window: number;

  @Prop()
  rocket: string;

  @Prop()
  success: boolean;

  @Prop()
  failures: {
    time: number;
    altitude: number;
    reason: string;
  }[];

  @Prop()
  details: string;

  @Prop()
  crew: string[];

  @Prop()
  ships: string[];

  @Prop()
  capsules: string[];

  @Prop()
  payloads: string[];

  @Prop()
  launchpad: string;

  @Prop()
  flight_number: number;

  @Prop()
  name: string;

  @Prop()
  date_utc: Date;

  @Prop()
  date_unix: number;

  @Prop()
  date_local: Date;

  @Prop()
  date_precision: string;

  @Prop()
  upcoming: boolean;

  @Prop()
  cores: {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean;
    landing_type: string;
    landpad: string;
  }[];

  @Prop()
  auto_update: boolean;

  @Prop()
  tbd: boolean;

  @Prop()
  launch_library_id: string;

  @Prop()
  id: string;
}

export const LaunchSchema = SchemaFactory.createForClass(Launch);
