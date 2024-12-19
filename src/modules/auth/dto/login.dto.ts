import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginTdo {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
