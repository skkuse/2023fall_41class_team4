import { ApiProperty } from '@nestjs/swagger';
import { CarbonEmissionConvertedResultDto } from './carbon-emission-converted-result.dto';

/**
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 표현한 값들을 표현하는 response 클래스입니다.
 * @author Min Ho CHO
 */
export class CarbonEmissionResponseDto {
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

  constructor(convertedResult: CarbonEmissionConvertedResultDto) {
    this.carbonFootPrint = convertedResult.carbonFootPrint + 'gCO2e';
    this.energy = convertedResult.energy + 'kWh';
    this.tvWatchingTime = convertedResult.tvWatchingTime + '시간';
    this.passengerCarMileage = convertedResult.passengerCarMileage + 'km';
    this.subwayTravelDistance = convertedResult.subwayTravelDistance + '층';
    this.appleProduction = convertedResult.appleProduction + '장';
  }
}
