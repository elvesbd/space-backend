import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LaunchEntity } from 'src/modules/rocket-launches/entity';

@Schema()
export class Launch extends Document implements LaunchEntity {
  @Prop()
  flightNumber: number;
  @Prop()
  missionName: string;
  @Prop()
  dateLaunch: string;
  @Prop()
  rocketId: string;
  @Prop()
  rocketName: string;
  @Prop()
  success: boolean;
  @Prop()
  youtubeLink: string;
}

export const LaunchSchema = SchemaFactory.createForClass(Launch);
LaunchSchema.index({ name: 'text' });
