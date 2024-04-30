import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from '../../enum/role.enum';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  selectedRole: RoleEnum;

  @IsOptional()
  password?: string;
}
