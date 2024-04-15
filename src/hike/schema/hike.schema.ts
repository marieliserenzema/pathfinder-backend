import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HikeDocument = HydratedDocument<Hike>;

export type Geometry = {
  type: string;
  coordinates: [number, number][];
};

export type Property = {
  description: string;
  distance: string;
  from: string;
  name: string;
  operator: string;
  'osmc-symbol': string;
  symbol: string;
  to: string;
  website: string;
};

@Schema()
export class Hike {
  @Prop({ required: true, type: Object })
  geometry: Geometry;

  @Prop({ required: true })
  hike_id: string;

  @Prop({ required: true, type: Object })
  properties: Property;

  @Prop({ required: true })
  type: string;
}

export const HikeSchema = SchemaFactory.createForClass(Hike);
