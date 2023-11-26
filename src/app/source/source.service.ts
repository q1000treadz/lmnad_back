import { Between, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import FileEntity from 'src/database/entities/file/file.entity';
import Source from 'src/database/entities/sources/source.entity';
import Record from 'src/database/entities/record/record.entity';
import { CreateSourceWithRecordsDto } from './dto/create-source-with-records.dto';
import { RecordService } from '../record/record.service';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,

    private readonly recordService: RecordService,
  ) {}
  async createSourceWithRecords(data: CreateSourceWithRecordsDto) {
    const records = [];
    for(const rr of data.records) {
      records.push(await this.recordService.createRecord(rr));
    }
    const file = await this.fileRepository.findOne({ where: { id: data.source.file_id }});
    const source = data.source;
    return await this.sourceRepository.save({
      ...source,
      file,
      records,
    })
  }
  async createSource(data: CreateSourceDto) {
    
    const file = data?.file_id ? await this.fileRepository.findOne({ where: { id: data.file_id }}) : null;
    const records = await this.recordRepository.find({ where: { id: In(data.record_ids)}});
    console.log(file, records)
    return await this.sourceRepository.save({
      ...data,
      file,
      records,
    })
  }

  async getOneSource(id: number) {
    return this.sourceRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        file: true,
        records: {
          record_files: true,
        }
      },
    });
  }

  async getSources() {
    return this.sourceRepository.find({
      relations: {
        file: true,
        records: {
          record_files: true,
        }
      },
    });
  }
}
