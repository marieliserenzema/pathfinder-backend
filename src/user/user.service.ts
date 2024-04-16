import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/auth/dto/register.dto';
import { Hike } from '../hike/schema/hike.schema';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

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

  public async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const cryptedPassword = await hash(updateUserDto.password, 10);
    return this.userModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            password: cryptedPassword,
            username: updateUserDto.username,
            email: updateUserDto.email,
          },
        },
        { new: true },
      )
      .exec();
  }

  public async updateFavorite(
    id: string,
    updateFavoriteDto: UpdateFavoriteDto,
  ) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (user?.favorite.includes(updateFavoriteDto.favorite)) {
      return this.userModel
        .findByIdAndUpdate(
          { _id: id },
          { $pull: { favorite: updateFavoriteDto.favorite } },
          { password: 0, new: true },
        )
        .exec();
    }
    return this.userModel
      .findByIdAndUpdate(
        { _id: id },
        { $addToSet: { favorite: updateFavoriteDto.favorite } },
        { password: 0 },
      )
      .exec();
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
