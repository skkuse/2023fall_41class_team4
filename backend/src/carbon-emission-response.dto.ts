import { ApiProperty } from '@nestjs/swagger';

export class CarbonEmissionResponseDto {
  @ApiProperty({ description: '탄소 배출량', example: 1000 })
  emission: number;

  @ApiProperty({ description: '전력 소모량', example: 30000 })
  powerConsumption: number;

  @ApiProperty({ description: 'TV 탄소 배출량과의 비교값', example: 120 })
  tvEmission: number;

  @ApiProperty({ description: '승용차 탄소 배출량과의 비교값', example: 0.2 })
  carEmission: number;

  @ApiProperty({
    description: '엘레베이터 탄소 배출량과의 비교값',
    example: 15,
  })
  elevatorEmission: number;

  @ApiProperty({
    description: 'A4 용지 탄소 배출량과의 비교값',
    example: 26000,
  })
  paperEmission: number;

  constructor(
    emission: number,
    powerConsumption: number,
    tvEmission: number,
    carEmission: number,
    elevatorEmission: number,
    paperEmission: number,
  ) {
    this.emission = emission;
    this.powerConsumption = powerConsumption;
    this.tvEmission = tvEmission;
    this.carEmission = carEmission;
    this.elevatorEmission = elevatorEmission;
    this.paperEmission = paperEmission;
  }
}
