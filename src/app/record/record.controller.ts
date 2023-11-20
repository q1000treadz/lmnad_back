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

    @Get(':id')
    async getIdByRecord(@Param('id') id: number) {
        return await this.recordService.getOneRecord(+id);
    }

    @Get('')
    async getRecords() {
        return await this.recordService.getRecords();
    }
}