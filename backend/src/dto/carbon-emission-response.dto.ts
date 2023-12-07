import { ApiProperty } from '@nestjs/swagger';
import { CarbonEmissionConvertedResultDto } from './carbon-emission-converted-result.dto';

/**
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 표현한 값들을 표현하는 response 클래스입니다.
 * @author Min Ho CHO
 */
export class CarbonEmissionResponseDto {
  @ApiProperty({ description: '런타임', example: '20.21ms' })
  runtime: string;

  @ApiProperty({ description: '메모리 사용량', example: '32.52MB' })
  memoryUsage: string;

  @ApiProperty({ description: '탄소 배출량', example: '20.02µgCO2e' })
  carbonFootPrint: string;

  @ApiProperty({ description: '전력 소모량', example: '30.02µWh' })
  readonly energy: string;

  @ApiProperty({ description: 'TV 탄소 배출량과의 비교값', example: '25.21μs' })
  readonly tvWatchingTime: string;

  @ApiProperty({
    description: '승용차 탄소 배출량과의 비교값',
    example: '12.11µm',
  })
  readonly passengerCarMileage: string;

  @ApiProperty({
    description: '지하철 이동거리과의 비교값',
    example: '12.12mm',
  })
  readonly subwayTravelDistance: string;

  @ApiProperty({
    description: '사과 생산량과의 비교값',
    example: '43.12µg',
  })
  readonly appleProduction: string;

  constructor(
    dto: CarbonEmissionConvertedResultDto,
    runtime: number,
    memoryUsage: number,
  ) {
    this.runtime = runtime.toFixed(2) + 'ms';
    this.memoryUsage = memoryUsage.toString(2) + 'MB';
    this.carbonFootPrint = dto.carbonFootPrint.toFixed(2) + 'µgCO2e';
    this.energy = dto.energy.toFixed(2) + 'µWh';
    this.tvWatchingTime = dto.tvWatchingTime.toFixed(2) + 'μs';
    this.passengerCarMileage = dto.passengerCarMileage.toFixed(2) + 'µm';
    this.subwayTravelDistance = dto.subwayTravelDistance.toFixed(2) + 'mm';
    this.appleProduction = dto.appleProduction.toFixed(2) + 'µg';
  }
}
