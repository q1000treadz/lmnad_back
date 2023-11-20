import { Between, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import FileEntity from 'src/database/entities/file/file.entity';
import Source from 'src/database/entities/sources/source.entity';
import Record from 'src/database/entities/record/record.entity';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) {}

  async createSource(data: CreateSourceDto) {
    const file = await this.fileRepository.findOne({ where: { id: data.file_id }});
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
      },
    });
  }

  async getSources() {
    return this.sourceRepository.findOneOrFail({
      relations: {
        file: true,
      },
    });
  }
}
