import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  public create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertService.create(createAlertDto);
  }

  @Get()
  public findAll() {
    return this.alertService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.alertService.findOne(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.alertService.remove(id);
  }
}
