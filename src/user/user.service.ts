import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/auth/dto/register.dto';
import { RoleEnum } from '../enum/role.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public create(registerDto: RegisterDto) {
    const createdUser = new this.userModel(registerDto);
    return createdUser.save();
  }

  public findAll() {
    return this.userModel.find().exec();
  }

  public findOne(id: string) {
    try {
      return this.userModel.findOne({ _id: id }).exec();
    } catch {
      throw new NotFoundException();
    }
  }

  public findOneByEmail(email: string) {
    try {
      return this.userModel.findOne({ email: email }).exec();
    } catch {
      throw new NotFoundException();
    }
  }

  public update(id: string, role: RoleEnum) {
    return this.userModel.updateOne({ _id: id }, { role: role });
  }

  public async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
