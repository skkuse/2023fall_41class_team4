import { Injectable } from '@nestjs/common';
import { CarbonEmissionConvertedResultDto } from 'src/dto/carbon-emission-converted-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emission } from '../db/entity/emission.entity';

/**
 * @file carbon-emissions-converter.service.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 변환하는 역할을 담당하는 클래스입니다.
 * @author Min Ho CHO
 */
@Injectable()
export class ConverterService {
  TV_CARBON_EMISSION_PER_HOUR: number;
  CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE: number;
  SUBWAY_TRAVEL_DISTANCE_KILOMETER_PER_GCO2E: number;
  APPLE_PRODUCTION_PER_GCO2E: number;
  readonly GCO2E_TO_MICRO_GCO2 = 1_000_000;
  readonly SOUTH_KOREA_CI = 436;
  readonly KILOWATT_TO_MICROWATT = 1_000_000_000;
  readonly HOUR_TO_MICROSECOND = 3.6 * 1_000_000_000;
  readonly KILOMETER_TO_MICROMETER = 1_000_000_000;
  readonly KILOMETER_TO_MILLIMETER = 1_000_000;
  readonly GRAM_TO_MICRO_GRAM = 1_000_000;

  constructor(
    @InjectRepository(Emission)
    private emissionRepository: Repository<Emission>,
  ) {
    this.init(emissionRepository);
  }

  async init(emissionRepository: Repository<Emission>) {
    this.TV_CARBON_EMISSION_PER_HOUR = (
      await this.getEmission('TV_CARBON_EMISSION_PER_HOUR', emissionRepository)
    ).emission;
    this.CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE = (
      await this.getEmission(
        'CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE',
        emissionRepository,
      )
    ).emission;
    this.SUBWAY_TRAVEL_DISTANCE_KILOMETER_PER_GCO2E = (
      await this.getEmission(
        'SUBWAY_TRAVEL_DISTANCE_KILOMETER_PER_GCO2E',
        emissionRepository,
      )
    ).emission;
    this.APPLE_PRODUCTION_PER_GCO2E = (
      await this.getEmission('APPLE_PRODUCTION_PER_GCO2E', emissionRepository)
    ).emission;
  }

  async getEmission(
    name: string,
    emissionRepository: Repository<Emission>,
  ): Promise<Emission> {
    return await emissionRepository.findOne({
      select: {
        emission: true,
      },
      where: {
        name: name,
      },
    });
  }

  /**
   * 탄소 배출량을 입력으로 받아, 실생활 사용량으로 변환하는 메서드입니다.
   * @param carbonEmission 탄소 배출량 (gCo2e 단위)
   */
  convertCarbonEmission(
    carbonEmission: number,
  ): CarbonEmissionConvertedResultDto {
    // 1. 탄소 배출량 계산
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

    // 6. 사과 생산량 계산
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
