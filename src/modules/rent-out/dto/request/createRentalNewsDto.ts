import { Prop } from '@shared/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateRentalNewsDto {
  @ApiProperty()
  @IsNumber()
  @Min(100000)
  pricePerMonth: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  area: number;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsString()
  commune: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  houseNumber: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specificAddress: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  imageUrl: string[];
}
