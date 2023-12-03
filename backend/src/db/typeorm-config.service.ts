import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'mysql',
      host: this.config.get('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      username: this.config.get('DATABASE_USER'),
      password: this.config.get('DATABASE_PASS'),
      database: this.config.get('DATABASE_NAME'),
      entities: [__dirname + '/*.entity.{js,ts}'],
      synchronize: true,
    };

    return options;
  }
}
