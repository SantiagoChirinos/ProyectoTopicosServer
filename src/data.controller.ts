import { Controller, Get } from '@nestjs/common';

@Controller('data')
export class DataController {
  @Get()
  getData() {
    // Simulación de datos
    return { message: 'Datos del servidor', data: [1, 2, 3, 4] };
  }
}
