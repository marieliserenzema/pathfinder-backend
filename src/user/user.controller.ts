import {
  Body,
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
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

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

  @Get('favorite')
  public favorite(@Req() req: AuthenticatedRequest) {
    const payload = req.user;
    if (!payload?.id) {
      throw new UnauthorizedException();
    }
    return this.userService.findFavorite(payload.id);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  public updateUser(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const payload = req.user;
    if (!payload?.id) {
      throw new UnauthorizedException();
    }
    return this.userService.updateUser(payload.id, updateUserDto);
  }

  @Patch('favorite')
  public updateFavorite(
    @Req() req: AuthenticatedRequest,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    const payload = req.user;
    if (!payload?.id) {
      throw new UnauthorizedException();
    }
    return this.userService.updateFavorite(payload.id, updateFavoriteDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
