/**
 * @file carbon-emissions-converted-values.dto.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 표현한 값들을 표현하는 dto 클래스입니다.
 * @author Min Ho CHO
 */
export class CarbonEmissionsConvertedValuesDto {
  readonly carbonFootPrint: string;

  readonly energy: string;

  readonly treeMonths: string;

  readonly passengerCar: string;

  readonly flightParisToLondon: string;

  constructor(
    carbonFootPrint: string,
    energy: string,
    treeMonths: string,
    passengerCar: string,
    flightParisToLondon: string,
  ) {
    this.carbonFootPrint = carbonFootPrint;
    this.energy = energy;
    this.treeMonths = treeMonths;
    this.passengerCar = passengerCar;
    this.flightParisToLondon = flightParisToLondon;
  }
}
