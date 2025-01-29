import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from 'src/repositories';
import { BoardRoleRepository } from 'src/repositories/BoardRole.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, BoardRole } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, BoardRole]),
    JwtModule.register({}),
  ],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, BoardRoleRepository],
})
export class BoardModule {}
