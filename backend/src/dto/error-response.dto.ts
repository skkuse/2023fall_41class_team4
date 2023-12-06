import { ApiProperty } from '@nestjs/swagger';

type JavaErrors =
  | 'Unprocessable Entity'
  | 'CompileError'
  | 'RuntimeError'
  | 'KilledError';

export class ErrorResponseDTO<T> {
  @ApiProperty({ description: '상태 코드', example: 422 })
  readonly statusCode: number;

  @ApiProperty({
    description: '에러 종류',
    examples: [
      'Unprocessable Entity',
      'CompileError',
      'RuntimeError',
      'KilledError',
    ],
  })
  readonly error: JavaErrors;

  @ApiProperty({ description: '에러 내용' })
  readonly message: string;
}
