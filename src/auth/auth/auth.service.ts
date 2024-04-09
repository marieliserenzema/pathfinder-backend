import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signIn(email: string, inputPassword: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user?.password || !(await compare(inputPassword, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async register(regisetDto: RegisterDto) {
    const cryptedPassword = await hash(regisetDto.password, 10);
    regisetDto = { ...regisetDto, password: cryptedPassword };
    const user = await this.userService.create(regisetDto);
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
