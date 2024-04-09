import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../guard/auth.guard';
import { RoleEnum } from '../enum/role.enum';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string) {
    return this.userService.update(id, RoleEnum.USER);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
