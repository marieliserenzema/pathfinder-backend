import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  hikeId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
