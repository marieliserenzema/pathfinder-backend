import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Hike } from '../hike/schema/hike.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Hike.name) private hikeModel: Model<Hike>,
  ) {}

  public create(registerDto: RegisterDto) {
    const createdUser = new this.userModel(registerDto);
    return createdUser.save();
  }

  public findAll() {
    return this.userModel.find({}, { password: 0 }).exec();
  }

  public findOne(id: string) {
    try {
      return this.userModel.findOne({ _id: id }, { password: 0 }).exec();
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

  public update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { favorite: { $each: updateUserDto.favorite } } },
      { password: 0 },
    );
  }

  public async findFavorite(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user?.favorite) {
      throw new NotFoundException();
    }

    return this.hikeModel.find({ _id: { $in: user.favorite } }).exec();
  }

  public async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
