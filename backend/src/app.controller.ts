import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CarbonEmissionRequestDto } from 'src/dto/carbon-emission-request.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CarbonEmissionResponseDto } from './dto/carbon-emission-response.dto';
import { JavaError } from './dto/java-error.exception';
import { ErrorResponseDTO } from './dto/error-response.dto';

@Controller()
@ApiTags('탄소 배출량 API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('carbon-emission')
  @ApiOperation({ summary: '탄소 배출량 생성 API' })
  @ApiCreatedResponse({ type: CarbonEmissionResponseDto })
  @ApiUnprocessableEntityResponse({ type: ErrorResponseDTO })
  @ApiCreatedResponse({ type: JavaError })
  async calculateEmissions(
    @Body() body: CarbonEmissionRequestDto,
  ): Promise<CarbonEmissionResponseDto> {
    try {
      return await this.appService.calculateEmission(body.code);
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error.message);
      } else if (error instanceof JavaError) {
        throw new UnprocessableEntityException(error.message, {
          description: error.name,
        });
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
