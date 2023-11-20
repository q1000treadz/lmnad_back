import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFileDto } from './dto/update-file.dto';
import FileEntity from 'src/database/entities/file/file.entity';

@Injectable()
export class FileService {

    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>
    ){}

    async getFile(id: number){
        const file = this.fileRepository.findOne({
            where: { id }
        });
        return file;
    }

    async getFileAll(){
        const files = await this.fileRepository.find();
        return files;
    }

    async createFile(file: UpdateFileDto[]){
        console.log('createFile ', file)
        const result = await this.fileRepository
        .createQueryBuilder()
        .insert()
        .into("files")
        .values(file)
        .execute();
        return result;
    }
}