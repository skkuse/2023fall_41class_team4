import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CarbonEmissionDto } from './carbon-emission.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('carbon-emissions')
  async calculateEmissions(@Body() body: any): Promise<CarbonEmissionDto> {
    await this.appService.calculateEmission(body.code);

    return new CarbonEmissionDto(1000, 30000, 120, 0.2, 15, 26000);
  }
}
