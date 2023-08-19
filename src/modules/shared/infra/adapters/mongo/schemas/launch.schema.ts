import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Launch extends Document {
  @Prop({
    type: {
      reused: Boolean,
      recovery_attempt: Boolean,
      recovered: Boolean,
      ships: [String],
    },
  })
  fairings: Record<string, any>;

  @Prop({
    type: {
      patch: {
        small: String,
        large: String,
      },
      reddit: {
        campaign: String,
        launch: String,
        media: String,
        recovery: String,
      },
      flickr: {
        small: [String],
        original: [String],
      },
      presskit: String,
      webcast: String,
      youtube_id: String,
      article: String,
      wikipedia: String,
    },
  })
  links: Record<string, any>;

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

  @Prop([
    {
      time: Number,
      altitude: Number,
      reason: String,
    },
  ])
  failures: Record<string, any>[];

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

  @Prop([
    {
      core: String,
      flight: Number,
      gridfins: Boolean,
      legs: Boolean,
      reused: Boolean,
      landing_attempt: Boolean,
      landing_success: Boolean,
      landing_type: String,
      landpad: String,
    },
  ])
  cores: Record<string, any>[];

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
