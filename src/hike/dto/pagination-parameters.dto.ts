import { IsOptional } from 'class-validator';

export class PaginationParametersDto {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  skip: number = 0;
}
