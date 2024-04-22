import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto, false);
  }

  @Post('register')
  public register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('admin')
  public signInAsAdmin(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto, true);
  }
}
