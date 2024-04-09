import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from '../../../enum/role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  role: RoleEnum = RoleEnum.USER;
}
