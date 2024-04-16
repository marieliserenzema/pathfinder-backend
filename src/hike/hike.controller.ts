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
import { FilterParametersDto } from './dto/filter-parameters.dto';

@UseGuards(AuthGuard)
@Controller('hike')
export class HikeController {
  constructor(private readonly hikeService: HikeService) {}

  @Get()
  public findAll(@Query() filterParametersDto: FilterParametersDto) {
    return this.hikeService.findAll(filterParametersDto);
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
