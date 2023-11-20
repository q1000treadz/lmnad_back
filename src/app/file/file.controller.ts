import { Controller, Get, Param, Body, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileService } from './File.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import {  diskStorage  } from 'multer';

import { fileName, fileFilter } from 'src/utils/multer/img-update.utils';
import { UpdateFileDto } from './dto/update-file.dto';
@Controller('api/file')
export class FileController {

    constructor(
        private readonly fileService: FileService
    ){}

    @Get("/:id")
    async getFile(@Param("id") id: number){
            return await this.fileService.getFile(id);
    }
    
    @Get()
    async getFileAll(){
        return await this.fileService.getFileAll();
    }

    @Post("/")
    @UseInterceptors(FilesInterceptor("image", 10, {
        storage: diskStorage({
            destination: './files',
            filename: fileName
        }),
        fileFilter: fileFilter
    }))

    async uploadedFile(@UploadedFiles() files,){
        console.log(files)
        const response = []; 
        files.forEach( async file => {
            const imgReponse = new UpdateFileDto();
            imgReponse.name = file.filename;
            imgReponse.url = file.path;
            imgReponse.state = "active";
            response.push(imgReponse);
        });      
        return await this.fileService.createFile(response);
    }
}