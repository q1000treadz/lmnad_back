import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import TypeOrmConfigService from './config/orm.config';
import FileEntity from './database/entities/file/file.entity';
import { FileRecord } from './database/entities/file-record/file-record.entity';
import Record from './database/entities/record/record.entity';
import Source from './database/entities/sources/source.entity';
import { SourceModule } from './app/source/source.module';
import { RecordModule } from './app/record/record.module';
import { FileModule } from './app/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'files'),       serveStaticOptions: { index: false },

    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Source, Record, FileEntity, FileRecord]),
    SourceModule,
    RecordModule,
    FileModule,
  ],
})
export class AppModule {}
