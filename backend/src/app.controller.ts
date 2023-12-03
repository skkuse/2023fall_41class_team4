import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CarbonEmissionResponseDto } from './carbon-emission-response.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarbonEmissionRequestDto } from './carbon-emission-request.dto';

@Controller()
@ApiTags('탄소 배출량 API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('carbon-emission')
  @ApiOperation({ summary: '탄소 배출량 생성 API' })
  @ApiCreatedResponse({ type: CarbonEmissionResponseDto })
  async calculateEmissions(
    @Body() body: CarbonEmissionRequestDto,
  ): Promise<CarbonEmissionResponseDto> {
    try {
      await this.appService.calculateEmission(body.code);
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error.message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }

    return new CarbonEmissionResponseDto(1000, 30000, 120, 0.2, 15, 26000);
  }
}
