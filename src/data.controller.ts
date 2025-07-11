/**
 * Controlador para exponer datos de ejemplo o información general del servidor.
 */
import { Controller, Get } from '@nestjs/common';

@Controller('data')
export class DataController {
  /**
   * Endpoint para obtener datos de ejemplo o información general.
   * @returns (Actualmente vacío, puedes personalizar la respuesta)
   */
  @Get()
  getData() {
  }
}
