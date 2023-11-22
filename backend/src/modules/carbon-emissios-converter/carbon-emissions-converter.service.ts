import { Injectable } from '@nestjs/common';
import { CarbonEmissionsConvertedValuesDto } from './carbon-emissions-converted-values.dto';

/**
 * @file carbon-emissions-converter.service.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 변환하는 역할을 담당하는 클래스입니다.
 * @author Min Ho CHO
 */
@Injectable()
export class CarbonEmissionsConverterService {
  readonly SOUTH_KOREA_CI = 180;
  readonly GRAMS_TO_KILOGRAMS = 1000;
  readonly EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE = 175;
  readonly PARIS_TO_LONDON_CARBON_EMISSIONS = 50000;

  /**
   * 탄소 배출량을 입력으로 받아, 실생활 사용량으로 변환하는 메서드입니다.
   * @param carbonEmission 탄소 배출량 (gCo2e 단위)
   */
  getConvertedCarbonEmissionsValues(
    carbonEmission: number,
  ): CarbonEmissionsConvertedValuesDto {
    // 1. Energy 계산
    // kWh 단위
    const energy: number = carbonEmission / this.SOUTH_KOREA_CI;

    // 2. Tree-months 계산
    const treeMonths: number =
      (carbonEmission / this.GRAMS_TO_KILOGRAMS / 11) * 12;

    // 3. passage car 계산
    // passage car은 유럽을 기준으로 계산
    // km 단위
    const passageCar: number =
      carbonEmission / this.EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE;

    // 4. flight 계산
    // flight는 paris to london을 기준으로 계산
    // % 단위
    const flight: number =
      (carbonEmission / this.PARIS_TO_LONDON_CARBON_EMISSIONS) * 100;

    return new CarbonEmissionsConvertedValuesDto(
      carbonEmission,
      energy,
      treeMonths,
      passageCar,
      flight,
      0,
    );
  }
}
