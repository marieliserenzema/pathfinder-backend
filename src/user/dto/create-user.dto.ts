import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto {
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
