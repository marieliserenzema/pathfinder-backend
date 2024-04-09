import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  text: string;

  //todo: add relation ?
  @Prop({ required: true })
  hikeId: string;

  //todo: add relation ?
  @Prop({ required: true })
  userId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
