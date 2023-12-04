import { ApiProperty } from '@nestjs/swagger';
import { CarbonEmissionConvertedResultDto } from './carbon-emission-converted-result.dto';
import { CarbonEmissionConvertedResultResponseDto } from './carbon-emission-converted-result-response.dto';

export class CarbonEmissionResponseDto {
  @ApiProperty({
    description: '코드 실행 결과',
    example:
      'OK (성공), COMPILE_ERROR (컴파일 에러), RUNTIME_ERROR (런타임 에러)',
  })
  readonly status: string;

  @ApiProperty({
    description: '탄소 배출량 및 실생활 사용량 (실행 실패 시 null)',
    example: new CarbonEmissionConvertedResultResponseDto(
      new CarbonEmissionConvertedResultDto(
        3.01,
        6.91,
        34.32,
        17.21,
        15.71,
        26.43,
      ),
    ),
  })
  readonly result: CarbonEmissionConvertedResultResponseDto;

  constructor(
    status: string,
    convertedResult: CarbonEmissionConvertedResultDto,
  ) {
    this.status = status;
    this.result = new CarbonEmissionConvertedResultResponseDto(convertedResult);
  }
}
