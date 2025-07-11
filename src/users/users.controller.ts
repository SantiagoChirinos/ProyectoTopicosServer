import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';

/**
 * Controlador para la gestión de usuarios.
 * Permite insertar, listar y buscar usuarios por username.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Inserta múltiples usuarios en la base de datos.
   * @param users Arreglo de usuarios a insertar
   */
  @Post('bulk')
  async insertUsers(@Body() users: User[]) {
    try {
      return await this.usersService.insertMany(users);
    } catch (error) {
      return { success: false, message: 'Error: ' + error.message };
    }
  }

  /**
   * Obtiene todos los usuarios registrados.
   */
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  /**
   * Busca un usuario por su username.
   * @param username Nombre de usuario a buscar
   */
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
}
