import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  public create(createCommentDto: CreateCommentDto) {
    const createdComment = new this.commentModel({
      text: createCommentDto.text,
      date: new Date(),
      user: createCommentDto.userId,
      hikeId: createCommentDto.hikeId,
    });
    return createdComment.save();
  }

  public findAll() {
    return this.commentModel.find().populate('user').exec();
  }

  public findHikeComments(hikeId: string) {
    return this.commentModel
      .find({ hikeId: hikeId })
      .populate('user', '_id username')
      .exec();
  }

  public findOne(id: string) {
    try {
      return this.commentModel
        .findOne({ _id: id })
        .populate('user', '_id username')
        .exec();
    } catch {
      throw new NotFoundException();
    }
  }

  public update(id: string, text: string) {
    return this.commentModel.updateOne({ _id: id }, { text });
  }

  public async remove(id: string) {
    await this.commentModel.findOneAndDelete({ _id: id }).exec();
  }
}
