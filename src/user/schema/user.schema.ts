import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: RoleEnum;

  //todo: add relation to hike schema later
  @Prop()
  favorite: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
