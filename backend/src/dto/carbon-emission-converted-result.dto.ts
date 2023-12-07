/**
 * @file carbon-emissions-converted-values.dto.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 표현한 값들을 표현하는 dto 클래스입니다.
 * @author Min Ho CHO
 */
export class CarbonEmissionConvertedResultDto {
  carbonFootPrint: number;

  readonly energy: number;

  readonly tvWatchingTime: number;

  readonly passengerCarMileage: number;

  readonly subwayTravelDistance: number;

  readonly appleProduction: number;

  constructor(
    carbonFootPrint: number,
    energy: number,
    tvWatchingTime: number,
    passengerCar: number,
    subwayTravelDistance: number,
    appleProduction: number,
  ) {
    this.carbonFootPrint = carbonFootPrint;
    this.energy = energy;
    this.tvWatchingTime = tvWatchingTime;
    this.passengerCarMileage = passengerCar;
    this.subwayTravelDistance = subwayTravelDistance;
    this.appleProduction = appleProduction;
  }
}
