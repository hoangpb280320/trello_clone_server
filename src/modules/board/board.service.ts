import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardRepository } from 'src/repositories';
import { generateId, handleException } from 'src/untils';
import {
  ApiResponse,
  BoardResponse,
  BoardsResponse,
  EBroadRole,
} from 'src/common/types';
import { SuccessMessage } from 'src/common/message';
import { BoardRoleRepository } from 'src/repositories/BoardRole.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly boardRoleRepository: BoardRoleRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private readonly folder = 'backgrounds';

  async create(
    data: CreateBoardDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<ApiResponse<BoardResponse>> {
    try {
      let backgroundId: string = null;
      if (file) {
        const { public_id } = await this.cloudinaryService.uploadImage(
          file,
          this.folder,
        );
        backgroundId = generateId(public_id);
      }
      const newBoard = await this.boardRepository.createEntity({
        ...data,
        backgroundId,
      });
      await this.boardRoleRepository.createEntity({
        role: EBroadRole.leader,
        userId,
        boardId: newBoard.id,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: SuccessMessage.createBoardSuccess,
        data: { board: newBoard },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async findAll(): Promise<ApiResponse<BoardsResponse>> {
    try {
      const boards = await this.boardRepository.findAllEntities();
      return {
        statusCode: HttpStatus.OK,
        data: { boards },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async findOne(id: number): Promise<ApiResponse<BoardResponse>> {
    try {
      const board = await this.boardRepository.findById(id);
      return {
        statusCode: HttpStatus.OK,
        data: { board },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async update(
    id: number,
    data: UpdateBoardDto,
  ): Promise<ApiResponse<BoardResponse>> {
    try {
      const board = await this.boardRepository.updateEntity(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.updateBoardSuccess,
        data: { board },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async delete(id: number): Promise<ApiResponse> {
    try {
      await this.boardRepository.deleteEntity(id);
      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.deleteBoardSuccess,
      };
    } catch (error) {
      handleException(error);
    }
  }
}
