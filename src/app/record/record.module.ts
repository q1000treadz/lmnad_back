import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordService } from './record.service';
import Record from 'src/database/entities/record/record.entity';
import FileEntity from 'src/database/entities/file/file.entity';
import { FileRecord } from 'src/database/entities/file-record/file-record.entity';
import { RecordController } from './record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Record, FileEntity, FileRecord])],
  controllers:[RecordController],
  providers: [RecordService],
  exports: [RecordService],
})
export class RecordModule {}
