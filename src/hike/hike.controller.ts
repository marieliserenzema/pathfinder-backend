import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { HikeService } from './hike.service';
import { AuthGuard } from '../guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('hike')
export class HikeController {
  constructor(private readonly hikeService: HikeService) {}

  @Get()
  public findAll() {
    return this.hikeService.findAll();
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
