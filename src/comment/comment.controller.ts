import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Roles } from '../decorator/role.decorator';
import { RoleEnum } from '../enum/role.enum';
import { RoleGuard } from '../guard/role.guard';
import { AuthenticatedRequest, AuthGuard } from '../guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  public create(
    @Req() req: AuthenticatedRequest,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const payload = req.user;
    if (!payload?.id) {
      throw new UnauthorizedException();
    }
    return this.commentService.create(payload.id, createCommentDto);
  }

  @Get()
  public findAll() {
    return this.commentService.findAll();
  }

  @Get('hike/:id')
  public findHikeComments(@Param('id') id: string) {
    return this.commentService.findHikeComments(id);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() text: string) {
    return this.commentService.update(id, text);
  }

  @Roles([RoleEnum.ADMIN])
  @UseGuards(RoleGuard)
  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
