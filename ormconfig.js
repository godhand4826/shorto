module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'shorto',
  synchronize: true /* warning */,
  dropSchema: false,
  logging: true,
  entities: ['dist/**/*.entity.{ts,js}'],
};
