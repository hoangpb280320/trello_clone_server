import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBackgroundDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
