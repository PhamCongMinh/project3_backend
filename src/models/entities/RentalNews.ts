import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@shared/swagger';

export type RentalNewsDocument = RentalNews & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class RentalNews {
  @Prop({
    type: 'string',
    required: true,
  })
  ownerId: string;

  @Prop({
    type: 'number',
    required: true,
  })
  pricePerMonth: number;

  @Prop({
    type: 'number',
    required: true,
  })
  area: number;

  @Prop({
    type: 'string',
    required: true,
  })
  city: string;

  @Prop({
    type: 'string',
    required: true,
  })
  district: string;

  @Prop({
    type: 'string',
    required: true,
  })
  commune: string;

  @Prop({
    type: 'string',
    required: true,
  })
  street: string;

  @Prop({
    type: 'number',
    required: true,
  })
  houseNumber: number;

  @Prop({
    type: 'string',
    required: true,
  })
  specificAddress: string;

  @Prop({
    type: 'string',
    required: true,
  })
  title: string;

  @Prop({
    type: 'string',
    required: true,
  })
  description: string;

  @Prop({
    type: Array,
    required: false,
  })
  imageUrl: string[];
}

export const RentalNewsSchema = SchemaFactory.createForClass(RentalNews);
