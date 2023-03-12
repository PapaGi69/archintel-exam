import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user.class';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
