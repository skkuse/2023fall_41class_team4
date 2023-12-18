import { Test, TestingModule } from '@nestjs/testing';
import { JavaCompilerService } from './java-compiler.service';
import { DBRepository } from '@app/db/db.repository';
import { DataSource, Repository } from 'typeorm';
import ds from '@app/db/typeorm/datasource';
import { Code } from '@app/db/entity/code.entity';
import { CompileError } from '@app/dto/java-error.exception';

const db = {
  saveExecutionResult: jest.fn(),
};

// mock execSync
jest.mock('child_process', () => {
  return {
    execSync: jest
      .fn()
      .mockReturnValueOnce(true)
      .mockImplementationOnce(() => {
        throw { stderr: 'error occurred during compilation' };
      }),
  };
});

describe('JavaCompilerService', () => {
  let service: JavaCompilerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JavaCompilerService, { provide: DBRepository, useValue: db }],
    }).compile();

    service = module.get<JavaCompilerService>(JavaCompilerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('compile', () => {
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

      // mock writeFile
      jest
        .spyOn(service as any, 'writeFile')
        .mockImplementation(async () => {});
    });

    it('should compile successfully', async () => {
      await service.compile(code);
      expect(db.saveExecutionResult).not.toHaveBeenCalled();
    });

    it('throw CompileError', async () => {
      await expect(service.compile(code)).rejects.toThrow(CompileError);
    });

    afterAll(async () => {
      await dataSource.destroy();
    });
  });
});
