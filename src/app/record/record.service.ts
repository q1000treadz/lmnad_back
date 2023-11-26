import { Between, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import FileEntity from 'src/database/entities/file/file.entity';
import Source from 'src/database/entities/sources/source.entity';
import Record from 'src/database/entities/record/record.entity';
import { FileRecord } from 'src/database/entities/file-record/file-record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    
    @InjectRepository(FileRecord)
    private readonly fileRecordRepository: Repository<FileRecord>
  ) {}

  async createRecord(data: CreateRecordDto) {
    const record = await this.recordRepository.save({
      ...data
    });
    const record_files = [];
    for(const file_record of data.file_records) {
      const file = await this.fileRepository.findOne({ where: { id: file_record.file_id }});
      record_files.push(await this.fileRecordRepository.save({file, record, file_type: file_record.file_type }));
    }
    return record;
  }

  async getOneRecord(id: number) {
    return this.recordRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        record_files: true,
        sources: {
          file: true,
        },
      },
    });
  }

  async getRecords() {
    const records = await this.recordRepository.find({
      relations: {
        record_files: true,
        sources: {
          file: true,
        },
      },
    });
    console.log(records)
    return records;
  }
}
