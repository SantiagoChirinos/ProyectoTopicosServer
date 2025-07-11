import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

/**
 * Servicio para la gestión de usuarios en la base de datos.
 */
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  /**
   * Busca un usuario por su username.
   * @param username Nombre de usuario
   * @returns Usuario encontrado o null
   */
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  /**
   * Obtiene todos los usuarios registrados.
   * @returns Arreglo de usuarios
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Inserta múltiples usuarios en la base de datos.
   * @param users Arreglo de usuarios a insertar
   * @throws ConflictException si hay usuarios duplicados
   */
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
