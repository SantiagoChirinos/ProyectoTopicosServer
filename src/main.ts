import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Punto de entrada principal para iniciar la aplicación NestJS.
 * 
 * Crea una instancia de la aplicación usando AppModule, inicia el servidor
 * escucha en el puerto 3000 y muestra un mensaje de confirmación en consola.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
}
bootstrap();
