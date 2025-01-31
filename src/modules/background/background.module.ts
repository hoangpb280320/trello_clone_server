import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { BackgroundRepository } from 'src/repositories';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CloudinaryModule, JwtModule],
  controllers: [BackgroundController],
  providers: [BackgroundService, BackgroundRepository],
})
export class BackgroundModule {}
