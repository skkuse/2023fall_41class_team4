import { ApiProperty } from '@nestjs/swagger';

/**
 * @file carbon-emissions-converted-values.dto.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 표현한 값들을 표현하는 dto 클래스입니다.
 * @author Min Ho CHO
 */
export class CarbonEmissionConvertedResultDto {
  @ApiProperty({ description: '탄소 배출량', example: 1000 })
  carbonFootPrint: number;

  @ApiProperty({ description: '전력 소모량', example: 30000 })
  readonly energy: number;

  @ApiProperty({ description: 'TV 탄소 배출량과의 비교값', example: 120 })
  readonly tvWatchingTime: number;

  @ApiProperty({ description: '승용차 탄소 배출량과의 비교값', example: 0.2 })
  readonly passengerCarMileage: number;

  @ApiProperty({
    description: '엘레베이터 탄소 배출량과의 비교값',
    example: 15,
  })
  readonly elevatorFloorMovement: number;

  @ApiProperty({
    description: 'A4 용지 탄소 배출량과의 비교값',
    example: 26000,
  })
  readonly a4PaperUsage: number;

  constructor(
    carbonFootPrint: number,
    energy: number,
    tvWatchingTime: number,
    passengerCar: number,
    elevatorFloorMovement: number,
    a4PaperUsage: number,
  ) {
    this.carbonFootPrint = carbonFootPrint;
    this.energy = energy;
    this.tvWatchingTime = tvWatchingTime;
    this.passengerCarMileage = passengerCar;
    this.elevatorFloorMovement = elevatorFloorMovement;
    this.a4PaperUsage = a4PaperUsage;
  }
}
