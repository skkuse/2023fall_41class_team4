import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/carbon-emission (POST)', () => {
    it('201 Created', async () => {
      const response = await request(app.getHttpServer())
        .post('/carbon-emission')
        .send({
          code: `
import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello World\");
  }
}
`,
        });
      expect(response.status).toBe(201);
    });

    it('422 UnprocessableEntity', async () => {
      const response = await request(app.getHttpServer())
        .post('/carbon-emission')
        .send({
          code: 'a'.repeat(5000),
        });
      expect(response.status).toBe(422);
      expect(response.body.message).toBe(
        '입력하는 코드의 사이즈는 4KB 이하여야 합니다.',
      );
    });

    it('422 CompileError', async () => {
      const response = await request(app.getHttpServer())
        .post('/carbon-emission')
        .send({
          code: 'a'.repeat(10),
        });
      expect(response.status).toBe(422);
      console.log(response.body);
      expect(response.body.error).toBe('CompileError');
    });

    it('422 RuntimeError', async () => {
      const response = await request(app.getHttpServer())
        .post('/carbon-emission')
        .send({
          code: `public class Main {
  public static void main(String[] args) {
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[3]);
  }
}`,
        });
      expect(response.status).toBe(422);
      expect(response.body.error).toBe('RuntimeError');
    });

    it('422 KilledError', async () => {
      const response = await request(app.getHttpServer())
        .post('/carbon-emission')
        .send({
          code: `public class Main {
  public static void main(String[] args) {
    timeoutTest();
  }

  private static void timeoutTest() {
    boolean a = true;
    while (true) {
      a = !a;
    }
  }
}`,
        });
      expect(response.status).toBe(422);
      expect(response.body.error).toBe('KilledError');
    }, 35000); // set timeout more than 30s
  });

  afterEach(async () => {
    await app.close();
  });
});
