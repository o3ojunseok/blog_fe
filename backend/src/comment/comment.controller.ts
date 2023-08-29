import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('list')
  async findAllComment() {
    return await this.commentService.findAllComment();
  }

  @Get('list/:id')
  async findOneComment(@Param('id') id: number) {
    return await this.commentService.findOneComment(id);
  }
}