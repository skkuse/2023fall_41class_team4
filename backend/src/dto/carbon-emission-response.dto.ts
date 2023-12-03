import { ApiProperty } from '@nestjs/swagger';
import { CarbonEmissionConvertedResultDto } from './carbon-emission-converted-result.dto';

export class CarbonEmissionResponseDto {
  @ApiProperty({
    description: '실행 결과',
    example:
      'OK (성공), COMPILE_ERROR (컴파일 에러), RUNTIME_ERROR (런타임 에러)',
  })
  readonly status: string;

  @ApiProperty({
    description: '탄소 배출량 (실행 실패 시 null)',
    example: 1000,
  })
  readonly carbonFootPrint: number;

  @ApiProperty({
    description: '실생활 사용량 (실행 실패 시 null)',
    example: new CarbonEmissionConvertedResultDto(
      1000,
      30000,
      120,
      0.2,
      15,
      26000,
    ),
  })
  readonly convertedResult: CarbonEmissionConvertedResultDto;

  constructor(
    status: string,
    convertedResult: CarbonEmissionConvertedResultDto,
  ) {
    this.status = status;
    this.carbonFootPrint = convertedResult.carbonFootPrint;
    this.convertedResult = convertedResult;
  }
}
