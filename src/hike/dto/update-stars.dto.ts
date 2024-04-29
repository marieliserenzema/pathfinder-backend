import { IsNumber, Max, Min } from 'class-validator';

export class UpdateStarsDto {
  @IsNumber()
  @Max(5)
  @Min(0)
  stars: number;
}
