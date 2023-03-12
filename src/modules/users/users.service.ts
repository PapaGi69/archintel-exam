import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.class';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

const TAG = '[UsersService]';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createContractDto: CreateUserDto): Promise<any> {
    const METHOD = '[createUser]';
    this.logger.log(`${TAG} ${METHOD}`);

    const newUser = new this.userModel(createContractDto);
    const result = await newUser.save();

    return { id: result.id };
  }

  async getUsers() {
    const METHOD = '[getUsers]';
    this.logger.log(`${TAG} ${METHOD}`);
    const users = await this.userModel.find();

    return users.map((result) => ({
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone,
    }));
  }

  async getUserByEmail(email: string): Promise<any> {
    const METHOD = '[getUserByEmail]';
    this.logger.log(`${TAG} ${METHOD}`);

    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new NotFoundException(`User with email "${email}" does not exists`);
    }
    return user;
  }

  async getUserById(id: string): Promise<any> {
    const METHOD = '[getUserById]';
    this.logger.log(`${TAG} ${METHOD}`);

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" does not exists`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const METHOD = '[updateUser]';
    this.logger.log(`${TAG} ${METHOD}`);

    const check = await this.userModel.findById(id);
    if (!check) {
      throw new NotFoundException(`User with id "${id}" does not exists`);
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  async deleteUser(id: string): Promise<any> {
    const METHOD = '[deleteUser]';
    this.logger.log(`${TAG} ${METHOD}`);

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" does not exists`);
    }

    return this.userModel.deleteOne({ _id: id });
  }
}
