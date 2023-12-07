import { DataSource } from 'typeorm';
import ds from './datasource';

let dataSource: DataSource;

const seed = async () => {
  dataSource = await ds.initialize();
  const queryRunner = await dataSource.createQueryRunner();

  // Converter Module에서 사용할 잘 알려진 탄소 배출량
  await queryRunner.manager.query(
    `INSERT INTO emission (name, emission)
    VALUES 
      ('TV_CARBON_EMISSION_PER_HOUR', 88),
      ('CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE', 175),
      ('SUBWAY_TRAVEL_DISTANCE_KILOMETER_PER_GCO2E', 0.653595),
      ('APPLE_PRODUCTION_PER_GCO2E', 2.5);`,
  );
};

seed()
  .then(async () => {
    await dataSource.destroy();
    console.log(`🌱 completed seeding ${ds.options.database}`);
  })
  .catch(async (error) => {
    console.error(error);
  });
