import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
