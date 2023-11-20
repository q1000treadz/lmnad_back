import { Module } from '@nestjs/common';
import { FileController } from './File.controller';
import { FileService } from './File.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import FileEntity from 'src/database/entities/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}