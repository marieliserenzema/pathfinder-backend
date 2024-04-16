import { IsOptional, IsString } from 'class-validator';
import { PaginationParametersDto } from './pagination-parameters.dto';

export class FilterParametersDto extends PaginationParametersDto {
  @IsOptional()
  @IsString()
  property: string;

  @IsOptional()
  @IsString()
  value: string;
}
