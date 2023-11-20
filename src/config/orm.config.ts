import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [`${__dirname}/../database/entities/**/*.entity{.ts,.js}`],
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
      migrations: ['dist/database/migrations/*{.ts,.js}'],
    };
  }
}
