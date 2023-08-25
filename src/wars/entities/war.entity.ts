import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class War extends Document {
  @ApiProperty({
    example: 'Title',
    description: 'Title of film (war)',
    uniqueItems: true,
  })
  @Prop({
    unique: true,
    index: true,
  })
  title: string;
  @ApiProperty({
    example: 3,
    description: 'Number of episode',
    uniqueItems: true,
  })
  @Prop({
    unique: true,
    index: true,
  })
  episode_id: number;
  @ApiProperty({
    example: 'Agustin Bessone',
    description: 'Name of director',
    uniqueItems: false,
  })
  @Prop()
  director: string;
  @ApiProperty({
    example: 'Marcos B',
    description: 'Name of producer',
    uniqueItems: false,
  })
  @Prop()
  producer: string;
  @ApiProperty({
    required: false,
  })
  @Prop()
  created: string;
  @ApiProperty({
    required: false,
  })
  @Prop()
  edited: string;
}

export const WarSchema = SchemaFactory.createForClass(War);
