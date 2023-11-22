import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CarbonEmissionResponseDto } from './carbon-emission-response.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarbonEmissionRequestDto } from './carbon-emission-request.dto';

@Controller('api')
@ApiTags('탄소 배출량 API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('carbon-emissions')
  @ApiOperation({ summary: '탄소 배출량 생성 API' })
  @ApiCreatedResponse({ type: CarbonEmissionResponseDto })
  async calculateEmissions(
    @Body() body: CarbonEmissionRequestDto,
  ): Promise<CarbonEmissionResponseDto> {
    await this.appService.calculateEmission(body.code);

    return new CarbonEmissionResponseDto(1000, 30000, 120, 0.2, 15, 26000);
  }
}
