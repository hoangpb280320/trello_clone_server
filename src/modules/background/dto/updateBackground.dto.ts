import { PartialType } from '@nestjs/mapped-types';
import { CreateBackgroundDto } from './createBackground.dto';

export class UpdateBackgroundDto extends PartialType(CreateBackgroundDto) {}
