import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBRepository } from './db/db.repository';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { ConverterService } from './converter/converter.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

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

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
