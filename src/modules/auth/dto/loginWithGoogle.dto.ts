import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithGoogleTdo {
  @IsNotEmpty()
  @IsString()
  code: string;
}
