import { IsNotEmpty, IsString } from 'class-validator';
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

  @IsNotEmpty()
  coordinate: LatLng;

  @IsString()
  @IsNotEmpty()
  photo: string;
}
