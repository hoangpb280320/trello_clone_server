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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/AuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/configs/multer.config';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(
    @Body() data: CreateBoardDto,
    @Req() req: Request,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req['userId'];
    return this.boardService.create(data, userId, file);
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
  updateTitle(@Param('id') id: string, @Body() { title }: { title: string }) {
    return this.boardService.updateTitle(+id, title);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updateBackground(
    @Param('id') id: string,
    @Body() { backgroundId }: { backgroundId: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.boardService.updateBackground(+id, backgroundId, file);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.delete(+id);
  }
}
