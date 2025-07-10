import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async insertMany(users: User[]): Promise<any> {
    try {
      return await this.userModel.insertMany(users, { ordered: false });
    } catch (error) {
      // Si el error es por duplicados, lanzar un mensaje claro
      if (error.code === 11000 || error.writeErrors) {
        throw new ConflictException('Algunos o todos los usuarios ya existen en la base de datos.');
      }
      throw error;
    }
  }
}
