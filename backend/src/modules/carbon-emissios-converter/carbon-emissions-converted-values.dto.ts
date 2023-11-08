/**
 * @file carbon-emissions-converted-values.dto.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 표현한 값들을 표현하는 dto 클래스입니다.
 * @author Min Ho CHO
 */
export class CarbonEmissionsConvertedValuesDto {
  readonly carbonFootPrint: number;

  readonly energy: number;

  readonly treeMonths: number;

  readonly passengerCar: number;

  readonly flightParisToLondon: number;

  constructor(
    carbonFootPrint: number,
    energy: number,
    treeMonths: number,
    passengerCar: number,
    flightParisToLondon: number,
  ) {
    this.carbonFootPrint = carbonFootPrint;
    this.energy = energy;
    this.treeMonths = treeMonths;
    this.passengerCar = passengerCar;
    this.flightParisToLondon = flightParisToLondon;
  }
}
