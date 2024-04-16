import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/role.decorator';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const payload = request.user;
    if (!payload?.id) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new NotFoundException();
    }
    if (this.matchRole(roles, user.role)) {
      return true;
    }
    throw new UnauthorizedException();
  }

  private matchRole(roles: string[], userRoles: string): boolean {
    return roles.includes(userRoles);
  }
}
