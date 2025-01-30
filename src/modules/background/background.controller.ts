import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/configs/multer.config';
import { CreateBackgroundDto } from './dto/createBackground.dto';
import { BackgroundService } from './background.service';
import { UpdateBackgroundDto } from './dto/updateBackground.dto';

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
