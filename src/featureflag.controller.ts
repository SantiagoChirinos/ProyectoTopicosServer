import { Controller, Get } from '@nestjs/common';

@Controller('feature-flag')
export class FeatureFlagController {
  @Get()
  checkFeatureFlag() {
    // Simulación de uso de Feature Flag
    const isEnabled = true; // Aquí se integraría el paquete NPM
    return { feature: 'nueva-funcionalidad', enabled: isEnabled };
  }
}
