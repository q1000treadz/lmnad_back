import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RecordService } from "./record.service";
import { CreateRecordDto } from "./dto/create-record.dto";

@Controller('api/record')
export class RecordController {

    constructor(
        private readonly recordService: RecordService,
    ){}

    @Post('')
    async createRecord(@Body() createRecord: CreateRecordDto) {
        return await this.recordService.createRecord(createRecord);
    }

    @Get('')
    async getRecords() {
        console.log('all')
        return await this.recordService.getRecords();
    }
    @Get(':id')
    async getIdByRecord(@Param('id') id: number) {
        return await this.recordService.getOneRecord(+id);
    }

    
}