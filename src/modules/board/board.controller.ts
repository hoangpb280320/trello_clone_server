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
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateBoardDto, @Req() req: Request) {
    const userId = req['userId'];
    return this.boardService.create(data, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateBoardDto) {
    return this.boardService.update(+id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.delete(+id);
  }
}
