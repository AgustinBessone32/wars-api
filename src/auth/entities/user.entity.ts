import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
  })
  email: string;
  @Prop()
  password: string;
  @Prop()
  fullName: string;
  @Prop({
    default: ['user'],
  })
  role: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
