import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { RoleEnum } from '../../enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signIn(signInDto: SignInDto, verifyIsAdmin: boolean) {
    const user = await this.userService.findOneByEmail(signInDto.email);
    if (
      !user?.password ||
      !(await compare(signInDto.password, user.password))
    ) {
      throw new UnauthorizedException();
    }
    if (verifyIsAdmin && user.role !== RoleEnum.ADMIN) {
      throw new UnauthorizedException();
    }
    const payload = { id: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async register(regisetDto: RegisterDto) {
    const cryptedPassword = await hash(regisetDto.password, 10);
    regisetDto = { ...regisetDto, password: cryptedPassword };
    const user = await this.userService.create(regisetDto);
    const payload = { id: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
