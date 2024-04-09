import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  public create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  public findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() text: string) {
    return this.commentService.update(id, text);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
