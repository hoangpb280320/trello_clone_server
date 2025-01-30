import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { BackgroundRepository } from 'src/repositories';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [BackgroundController],
  providers: [BackgroundService, BackgroundRepository],
})
export class BackgroundModule {}
