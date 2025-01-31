import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/configs/multer.config';
import { CreateBackgroundDto } from './dto/createBackground.dto';
import { BackgroundService } from './background.service';
import { UpdateBackgroundDto } from './dto/updateBackground.dto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { Request } from 'express';

@Controller('background')
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateBackgroundDto,
  ) {
    return this.backgroundService.create(data, file);
  }

  @Get()
  getAll() {
    return this.backgroundService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/defaults')
  getAllDefaults(@Req() req: Request) {
    const userId = req['userId'];
    return this.backgroundService.findAllByUserId(userId);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updatte(
    @Param('id') id: string,
    @Body() data: UpdateBackgroundDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.backgroundService.update(id, data, file);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.backgroundService.delete(id);
  }
}
