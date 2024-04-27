import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type AlertDocument = HydratedDocument<Alert>;

@Schema()
export class Alert {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  hikeId: string;

  @Prop({ type: {}, required: true })
  coordinate: LatLng;

  @Prop({ required: false })
  photo: string;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
