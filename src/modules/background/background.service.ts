import { HttpStatus, Injectable } from '@nestjs/common';
import { BackgroundRepository } from 'src/repositories';
import { generateId, generatePublicId, handleException } from 'src/untils';
import { CreateBackgroundDto } from './dto/createBackground.dto';
import {
  ApiResponse,
  BackgroundResponse,
  BackgroundsResponse,
} from 'src/common/types';
import { SuccessMessage } from 'src/common/message';
import { UpdateBackgroundDto } from './dto/updateBackground.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Background } from 'src/entities/background.entity';

@Injectable()
export class BackgroundService {
  constructor(
    private readonly backgroundRepository: BackgroundRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private readonly folderName: string = 'backgrounds';

  async create(
    data: CreateBackgroundDto,
    file: Express.Multer.File,
  ): Promise<ApiResponse<BackgroundResponse>> {
    try {
      const { secure_url, public_id } =
        await this.cloudinaryService.uploadImage(file, this.folderName);
      const newBackground = await this.backgroundRepository.createEntity({
        ...data,
        id: generateId(public_id),
        image: secure_url,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: SuccessMessage.createBackgroundSuccess,
        data: {
          background: newBackground,
        },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async findOne(id: string): Promise<ApiResponse<BackgroundResponse>> {
    try {
      const background = await this.backgroundRepository.findById(id);
      return {
        statusCode: HttpStatus.OK,
        data: { background },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async findAll(): Promise<ApiResponse<BackgroundsResponse>> {
    try {
      const backgrounds = await this.backgroundRepository.findAllEntities();
      return {
        statusCode: HttpStatus.OK,
        data: { backgrounds },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async update(
    id: string,
    data: UpdateBackgroundDto,
    file?: Express.Multer.File,
  ): Promise<ApiResponse<BackgroundResponse>> {
    try {
      let background: Background;
      if (file) {
        await this.cloudinaryService.deleteImage(generatePublicId(id));
        const { secure_url, public_id } =
          await this.cloudinaryService.uploadImage(file, this.folderName);
        background = await this.backgroundRepository.createEntity({
          id: generateId(public_id),
          image: secure_url,
          ...data,
        });
        await this.backgroundRepository.deleteEntity(id);
      } else {
        background = await this.backgroundRepository.updateEntity(id, data);
      }
      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.updateBackgroundSuccess,
        data: {
          background,
        },
      };
    } catch (error) {
      handleException(error);
    }
  }

  async delete(id: string): Promise<ApiResponse> {
    try {
      const public_id = generatePublicId(id);
      await this.cloudinaryService.deleteImage(public_id);
      await this.backgroundRepository.deleteEntity(id);
      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.deleteBackgroundSuccess,
      };
    } catch (error) {
      handleException(error);
    }
  }
}
