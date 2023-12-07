import { Inject, Injectable } from '@nestjs/common';
import { CarbonEmissionConvertedResultDto } from 'src/dto/carbon-emission-converted-result.dto';
import {
  CONVERTER_CONFIG,
  HOUR_TO_MILLISECOND,
  KILO_TO_MICRO,
  KILO_TO_MILLI,
  MICRO,
} from './converter.constants';
import { Reference } from './reference.enum';

/**
 * @file converter.service.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 변환하는 역할을 담당하는 클래스입니다.
 * @author Min Ho CHO
 */
@Injectable()
export class ConverterService {
  constructor(
    @Inject(CONVERTER_CONFIG)
    private readonly config: {
      CI: number;
      [ref: string]: number;
    },
  ) {}

  /**
   * 탄소 배출량을 입력으로 받아, 실생활 사용량으로 변환하는 메서드입니다.
   * @param carbonEmission 탄소 배출량 (gCo2e 단위)
   */
  convertCarbonEmission(
    carbonEmission: number,
  ): CarbonEmissionConvertedResultDto {
    // 1. 탄소 배출량 계산
    // µgCO2e 단위
    const convertedCarbonEmission: number = carbonEmission * MICRO;

    // 2. 전력 소모량 계산
    // µWh 단위
    const energy: number = (carbonEmission / this.config.CI) * KILO_TO_MICRO;

    // 3. TV 시청 시간 계산
    // ms 단위
    const tvWatchingTime: number =
      (carbonEmission / this.config[Reference.TV_WATCH_TIME]) *
      HOUR_TO_MILLISECOND;

    // 4. 승용차 주행 거리 계산
    // µm 단위
    const passageCar: number =
      (carbonEmission / this.config[Reference.DRIVING_DISTANCE]) *
      KILO_TO_MICRO;

    // 5. 지하철 이동 거리 계산
    // mm 단위
    const subwayTravelDistance: number =
      carbonEmission * this.config[Reference.SUBWAY_DISTANCE] * KILO_TO_MILLI;

    // 6. 사과 생산량 계산
    // µg 단위
    const appleProduction: number =
      carbonEmission * this.config[Reference.APPLE_PRODUCTION] * MICRO;

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
