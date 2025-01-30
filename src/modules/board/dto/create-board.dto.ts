import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsDateString()
  deadline: string;

  @IsOptional()
  @IsString()
  backgroundId: string;
}
