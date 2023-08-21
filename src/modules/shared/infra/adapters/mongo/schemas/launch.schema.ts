import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  Fairings,
  Links,
  Failure,
  Core,
  LaunchEntity,
} from 'src/modules/launches/entity';

@Schema()
export class Launch extends Document implements LaunchEntity {
  @Prop({
    type: {
      reused: Boolean,
      recoveryAttempt: Boolean,
      recovered: Boolean,
      ships: [String],
    },
  })
  fairings: Fairings;
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
      youtubeId: String,
      article: String,
      wikipedia: String,
    },
  })
  links: Links;
  @Prop()
  staticFireDateUtc: string;
  @Prop()
  staticFireDateUnix: number;
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
  failures: Failure[];
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
  flightNumber: number;
  @Prop()
  name: string;
  @Prop()
  dateUtc: string;
  @Prop()
  dateUnix: number;
  @Prop()
  dateLocal: string;
  @Prop()
  datePrecision: string;
  @Prop()
  upcoming: boolean;
  @Prop([
    {
      core: String,
      flight: Number,
      gridfins: Boolean,
      legs: Boolean,
      reused: Boolean,
      landingAttempt: Boolean,
      landingSuccess: Boolean,
      landingType: String,
      landpad: String,
    },
  ])
  cores: Core[];
  @Prop()
  autoUpdate: boolean;
  @Prop()
  tbd: boolean;
  @Prop()
  launchLibraryId: string;
  @Prop()
  id: string;
}

export const LaunchSchema = SchemaFactory.createForClass(Launch);
