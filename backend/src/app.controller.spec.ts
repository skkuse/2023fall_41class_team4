import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBRepository } from './db/db.repository';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { ConverterService } from './converter/converter.service';
import { ConfigService } from '@nestjs/config';
import { CarbonEmissionResponseDto } from './dto/carbon-emission-response.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import { CompileError } from './dto/java-error.exception';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: DBRepository, useValue: {} },
        { provide: JavaCompilerService, useValue: {} },
        { provide: JavaRunnerService, useValue: {} },
        { provide: ConverterService, useValue: {} },
        {
          provide: ConfigService,
          useFactory: () => ({
            get: () => 1,
          }),
        },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('calculateEmission', () => {
    const code = `
import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello World\");
  }
}
`;

    it('should return emission', async () => {
      const response: CarbonEmissionResponseDto = {
        runtime: '20.21ms',
        memoryUsage: '32.52MB',
        carbonFootPrint: '20.02µgCO2e',
        energy: '30.02µWh',
        tvWatchingTime: '25.21ms',
        passengerCarMileage: '12.11µm',
        subwayTravelDistance: '12.12mm',
        appleProduction: '43.12µg',
      };
      jest.spyOn(service, 'calculateEmission').mockResolvedValue(response);

      const result = await controller.calculateEmission({ code });
      expect(result).toBe(response);
    });

    it('should throw 422 if UnprocessableEntityException occurred', async () => {
      jest
        .spyOn(service, 'calculateEmission')
        .mockRejectedValue(
          new UnprocessableEntityException(
            '입력하는 코드의 사이즈는 4KB 이하여야 합니다.',
          ),
        );

      await expect(controller.calculateEmission({ code })).rejects.toThrow(
        UnprocessableEntityException,
      );
    });

    it('should throw 422 if JavaError occurred', async () => {
      jest
        .spyOn(service, 'calculateEmission')
        .mockRejectedValue(new CompileError('error log'));

      await expect(controller.calculateEmission({ code })).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });
});
