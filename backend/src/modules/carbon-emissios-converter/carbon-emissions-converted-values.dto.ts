// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IsNotEmpty } from 'class-validator';

/**
 * @file carbon-emissions-converted-values.dto.ts
 * @description 탄소 배출량을 일상생활에서의 각종 사용량으로 표현한 값들을 표현하는 dto 클래스입니다.
 * @author Min Ho CHO
 */
export class CarbonEmissionsConvertedValuesDto {
  @IsNotEmpty()
  readonly carbonFootPrint: number;

  @IsNotEmpty()
  readonly energy: number;

  @IsNotEmpty()
  readonly treeMonths: number;

  @IsNotEmpty()
  readonly passengerCar: number;

  @IsNotEmpty()
  readonly flightParisToLondon: number;
}
