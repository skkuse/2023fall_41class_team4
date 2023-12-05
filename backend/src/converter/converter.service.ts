import { Injectable } from '@nestjs/common';
import { CarbonEmissionConvertedResultDto } from 'src/common/carbon-emission-converted-result.dto';

/**
 * @file carbon-emissions-converter.service.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 변환하는 역할을 담당하는 클래스입니다.
 * @author Min Ho CHO
 */
@Injectable()
export class ConverterService {
  readonly SOUTH_KOREA_CI = 436;
  readonly TV_CARBON_EMISSION_PER_HOUR = 88;
  readonly CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE = 175;
  readonly KILO_WATT_TO_WATT = 1000;
  readonly CARBON_EMISSIONS_OF_ELEVATOR_PER_FLOOR = 2;
  readonly CARBON_EMISSIONS_OF_A4_PER_SHEET = 4.5;

  /**
   * 탄소 배출량을 입력으로 받아, 실생활 사용량으로 변환하는 메서드입니다.
   * @param carbonEmission 탄소 배출량 (gCo2e 단위)
   */
  convertCarbonEmission(
    carbonEmission: number,
  ): CarbonEmissionConvertedResultDto {
    // 1. 전력 소모량 계산
    // kWh 단위
    const energy: number = carbonEmission / this.SOUTH_KOREA_CI;

    // 2. TV 시청 시간 계산
    // 시간 단위
    const tvWatchingTime: number =
      carbonEmission / this.TV_CARBON_EMISSION_PER_HOUR;

    // 3. 승용차 주행 거리 계산
    // km 단위
    const passageCar: number =
      carbonEmission / this.CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE;

    // 4. 엘레베이터 층수 이동 계산
    // ~개 단위
    const elevatorFloorMovement: number =
      (energy * this.KILO_WATT_TO_WATT) /
      this.CARBON_EMISSIONS_OF_ELEVATOR_PER_FLOOR;

    // 5. A4 용지 개수 계산
    // ~장 단위
    const a4PaperUsage: number =
      carbonEmission / this.CARBON_EMISSIONS_OF_A4_PER_SHEET;

    return new CarbonEmissionConvertedResultDto(
      carbonEmission,
      energy,
      tvWatchingTime,
      passageCar,
      elevatorFloorMovement,
      a4PaperUsage,
    );
  }
}
