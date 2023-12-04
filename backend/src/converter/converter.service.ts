import { Injectable } from '@nestjs/common';
import { CarbonEmissionConvertedResultDto } from 'src/dto/carbon-emission-converted-result.dto';

/**
 * @file carbon-emissions-converter.service.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 변환하는 역할을 담당하는 클래스입니다.
 * @author Min Ho CHO
 */
@Injectable()
export class ConverterService {
  readonly GCO2E_TO_MICRO_GCO2 = 1000000;
  readonly SOUTH_KOREA_CI = 436;
  readonly KILOWATT_TO_MICROWATT = 1000000000;
  readonly TV_CARBON_EMISSION_PER_HOUR = 88;
  readonly HOUR_TO_MICROSECOND = 3.6 * 1000000000;
  readonly CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE = 175;
  readonly KILOMETER_TO_MICROMETER = 1000000000;
  readonly SUBWAY_TRAVEL_DISTANCE_KILOMETER_PER_GCO2E = 1 / 1.53;
  readonly KILOMETER_TO_MILLIMETER = 1000000;
  readonly APPLE_PRODUCTION_PER_GCO2E = 2.5;
  readonly GRAM_TO_MICRO_GRAM = 1000000;

  /**
   * 탄소 배출량을 입력으로 받아, 실생활 사용량으로 변환하는 메서드입니다.
   * @param carbonEmission 탄소 배출량 (gCo2e 단위)
   */
  convertCarbonEmission(
    carbonEmission: number,
  ): CarbonEmissionConvertedResultDto {
    // 1. 탄소 배출량 계싼
    // µgCO2e 단위
    const convertedCarbonEmission: number =
      carbonEmission * this.GCO2E_TO_MICRO_GCO2;

    // 2. 전력 소모량 계산
    // µWh 단위
    const energy: number =
      (carbonEmission / this.SOUTH_KOREA_CI) * this.KILOWATT_TO_MICROWATT;

    // 3. TV 시청 시간 계산
    // μs 단위
    const tvWatchingTime: number =
      (carbonEmission / this.TV_CARBON_EMISSION_PER_HOUR) *
      this.HOUR_TO_MICROSECOND;

    // 4. 승용차 주행 거리 계산
    // µm 단위
    const passageCar: number =
      (carbonEmission / this.CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE) *
      this.KILOMETER_TO_MICROMETER;

    // 5. 지하철 이동 거리 계산
    // mm 단위
    const subwayTravelDistance: number =
      carbonEmission *
      this.SUBWAY_TRAVEL_DISTANCE_KILOMETER_PER_GCO2E *
      this.KILOMETER_TO_MILLIMETER;

    // 6. 사과 생산량
    // µg 단위
    const appleProduction: number =
      carbonEmission *
      this.APPLE_PRODUCTION_PER_GCO2E *
      this.GRAM_TO_MICRO_GRAM;

    return new CarbonEmissionConvertedResultDto(
      convertedCarbonEmission,
      energy,
      tvWatchingTime,
      passageCar,
      subwayTravelDistance,
      appleProduction,
    );
  }
}
