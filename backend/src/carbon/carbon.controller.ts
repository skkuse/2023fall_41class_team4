import { Controller, Get } from '@nestjs/common';
import { CarbonService } from './carbon.service';

@Controller('carbon')
export class CarbonController {
  constructor(private readonly carbonService: CarbonService) {}

  @Get()
  get() {
    return this.carbonService.calculateEmission(1);
  }
}
