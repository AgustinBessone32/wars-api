import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class War extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  title: string;
  @Prop({
    unique: true,
    index: true,
  })
  episode_id: number;
  @Prop()
  director: string;
}

export const WarSchema = SchemaFactory.createForClass(War);
