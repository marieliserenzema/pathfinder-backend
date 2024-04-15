import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { HikeService } from './hike.service';
import { AuthGuard } from '../guard/auth.guard';
import { PaginationParametersDto } from './dto/pagination-parameters.dto';

@UseGuards(AuthGuard)
@Controller('hike')
export class HikeController {
  constructor(private readonly hikeService: HikeService) {}

  @Get()
  public findAll(@Query() paginationParametersDto: PaginationParametersDto) {
    return this.hikeService.findAll(paginationParametersDto);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.hikeService.findOne(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.hikeService.remove(+id);
  }
}
