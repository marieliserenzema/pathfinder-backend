import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Body,
  Patch,
} from '@nestjs/common';
import { HikeService } from './hike.service';
import { AuthGuard } from '../guard/auth.guard';
import { FilterParametersDto } from './dto/filter-parameters.dto';
import { UpdateStarsDto } from './dto/update-stars.dto';
import { Roles } from '../decorator/role.decorator';
import { RoleEnum } from '../enum/role.enum';
import { RoleGuard } from '../guard/role.guard';

@UseGuards(AuthGuard)
@Controller('hikes')
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

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateStarsDto: UpdateStarsDto,
  ) {
    return this.hikeService.updateStars(id, updateStarsDto);
  }

  @Roles([RoleEnum.ADMIN])
  @UseGuards(RoleGuard)
  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.hikeService.remove(id);
  }
}
