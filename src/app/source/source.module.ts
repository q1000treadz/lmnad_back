import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceService } from './source.service';

import Source from 'src/database/entities/sources/source.entity';
import { FileRecord } from 'src/database/entities/file-record/file-record.entity';
import FileEntity from 'src/database/entities/file/file.entity';
import Record from 'src/database/entities/record/record.entity';
import { SourceController } from './source.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Source, Record, FileEntity, FileRecord])],
  controllers:[SourceController],
  providers: [SourceService],
  exports: [SourceService],
})
export class SourceModule {}
