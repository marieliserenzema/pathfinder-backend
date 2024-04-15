import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticatedRequest, AuthGuard } from '../guard/auth.guard';
import { RoleEnum } from '../enum/role.enum';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  public me(@Req() req: AuthenticatedRequest) {
    const payload = req.user;
    if (!payload?.id) {
      throw new UnauthorizedException();
    }
    return this.userService.findOne(payload?.id);
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
