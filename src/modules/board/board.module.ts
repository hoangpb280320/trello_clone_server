import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository, BoardRoleRepository } from 'src/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, BoardRole } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, BoardRole]),
    JwtModule.register({}),
    CloudinaryModule,
  ],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, BoardRoleRepository],
})
export class BoardModule {}
