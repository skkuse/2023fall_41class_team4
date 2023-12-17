import { Test, TestingModule } from '@nestjs/testing';
import { JavaRunnerService } from './java-runner.service';
import { DBRepository } from '@app/db/db.repository';
import { Code } from '@app/db/entity/code.entity';
import ds from '@app/db/typeorm/datasource';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { KilledError, RuntimeError } from '@app/dto/java-error.exception';

const db = {
  saveExecutionResult: jest.fn(),
};

// mock execSync
jest.mock('child_process', () => {
  return {
    execSync: jest
      .fn()
      .mockReturnValueOnce('0 100 100') // success
      .mockReturnValueOnce('1') // runtime error
      .mockReturnValueOnce('2 10000000'), // time limit exceeded
  };
});

// mock readFile
jest.mock('fs/promises', () => {
  return {
    readFile: jest.fn().mockResolvedValue('error log'),
  };
});

describe('JavaRunnerService', () => {
  let service: JavaRunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JavaRunnerService,
        { provide: DBRepository, useValue: db },
        {
          provide: ConfigService,
          useFactory: () => ({
            get: () => 1,
          }),
        },
      ],
    }).compile();

    service = module.get<JavaRunnerService>(JavaRunnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('run', () => {
    let dataSource: DataSource;
    let codeRepository: Repository<Code>;
    let code: Code;

    beforeAll(async () => {
      // mock code repository and create code
      const input = `public class Main {
        public static void main(String[] args) {
          int[] numbers = {1, 2, 3};
          System.out.println(numbers[2]);
        }
      }`;
      dataSource = await ds.initialize();
      codeRepository = dataSource.getRepository(Code);
      code = codeRepository.create({ code: input });
    });

    beforeEach(() => {
      db.saveExecutionResult.mockClear();
    });

    it('should run successfully', async () => {
      await service.run(code);
      expect(db.saveExecutionResult.mock.calls[0][2]).toBe(false);
    });

    it('should throw RuntimeError if runtime error occurred', async () => {
      await expect(service.run(code)).rejects.toThrow(RuntimeError);
      expect(db.saveExecutionResult.mock.calls[0][2]).toBe(true);
    });

    it('should throw KilledError if timeout occrred', async () => {
      await expect(service.run(code)).rejects.toThrow(KilledError);
      expect(db.saveExecutionResult.mock.calls[0][2]).toBe(true);
    });

    afterAll(async () => {
      await dataSource.destroy();
    });
  });
});
