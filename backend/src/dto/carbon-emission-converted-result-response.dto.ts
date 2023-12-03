import { ApiProperty } from '@nestjs/swagger';
import { CarbonEmissionConvertedResultDto } from './carbon-emission-converted-result.dto';

/**
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 표현한 값들을 표현하는 response 클래스입니다.
 * @author Min Ho CHO
 */
export class CarbonEmissionConvertedResultResponseDtoDto {
  @ApiProperty({ description: '탄소 배출량', example: '1000gCO2e' })
  carbonFootPrint: string;

  @ApiProperty({ description: '전력 소모량', example: '30000kWh' })
  readonly energy: string;

  @ApiProperty({ description: 'TV 탄소 배출량과의 비교값', example: '120시간' })
  readonly tvWatchingTime: string;

  @ApiProperty({
    description: '승용차 탄소 배출량과의 비교값',
    example: '0.2km',
  })
  readonly passengerCarMileage: string;

  @ApiProperty({
    description: '엘레베이터 탄소 배출량과의 비교값',
    example: '15층',
  })
  readonly elevatorFloorMovement: string;

  @ApiProperty({
    description: 'A4 용지 탄소 배출량과의 비교값',
    example: '26000장',
  })
  readonly a4PaperUsage: string;

  constructor(convertedResult: CarbonEmissionConvertedResultDto) {
    this.carbonFootPrint = convertedResult.carbonFootPrint + 'gCO2e';
    this.energy = convertedResult.energy + 'kWh';
    this.tvWatchingTime = convertedResult.tvWatchingTime + '시간';
    this.passengerCarMileage = convertedResult.passengerCarMileage + 'km';
    this.elevatorFloorMovement = convertedResult.elevatorFloorMovement + '층';
    this.a4PaperUsage = convertedResult.a4PaperUsage + '장';
  }
}
