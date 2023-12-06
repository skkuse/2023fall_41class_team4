import { ApiProperty } from '@nestjs/swagger';

export class CarbonEmissionRequestDto {
  @ApiProperty({
    description: '계산할 java code',
    example: `
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            System.out.println(\"Hello World\");
        }
    }
    `,
  })
  code: string;
}
