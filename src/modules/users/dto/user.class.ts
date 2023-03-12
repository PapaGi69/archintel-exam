import { IsEmail } from 'class-validator';

export class CreateUserDto {
  name: string;
  @IsEmail()
  email: string;
  phone: string;
  password: string;
}
