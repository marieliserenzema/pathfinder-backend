import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsArray()
  @IsNotEmpty()
  favorite: string[];
}
