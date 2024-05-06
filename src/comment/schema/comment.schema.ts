import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  hikeId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
