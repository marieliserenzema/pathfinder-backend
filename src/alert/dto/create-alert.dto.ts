import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LatLng } from '../schema/alert.schema';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  hikeId: string;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  coordinate: LatLng;

  @IsString()
  @IsOptional()
  photo?: string;
}
