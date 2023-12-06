import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db/typeorm/typeorm-config.service';
import { JavaRunnerModule } from './java-runner/java-runner.module';
import { JavaCompilerModule } from './java-compiler/java-compiler.module';
import { ConverterModule } from './converter/converter.module';
import { DBRepository } from './db/db.repository';
import { emissionReferences } from './converter/converter.constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    DBModule,
    JavaCompilerModule,
    JavaRunnerModule,
    ConverterModule.forRootAsync({
      imports: [ConfigModule, DBModule],
      useFactory: async (
        configService: ConfigService,
        repository: DBRepository,
      ) => {
        const CI = configService.get('CARBON_INTENSITY');
        const emissions = await repository.getEmissions(emissionReferences);
        return emissions.reduce(
          (obj, emission) => {
            return {
              ...obj,
              [emission['name']]: emission['emission'],
            };
          },
          { CI },
        );
      },
      inject: [ConfigService, DBRepository],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
