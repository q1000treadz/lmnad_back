import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSourceDto } from "./dto/create-source.dto";
import { SourceService } from "./source.service";
import { CreateSourceWithRecordsDto } from "./dto/create-source-with-records.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Источник')
@Controller('source')
export class SourceController {

    constructor(
        private readonly sourceService: SourceService,
    ){}

    @Post('')
    async createSource(@Body() createSource: CreateSourceDto) {
        return await this.sourceService.createSource(createSource);
    }
    @Post('withRecords')
    async createSourceWithRecords(@Body() createSource: CreateSourceWithRecordsDto) {
        return await this.sourceService.createSourceWithRecords(createSource);
    }
    @Get('')
    async getSources() {
        return await this.sourceService.getSources();
    }
    @Get(':id')
    async getIdBySource(@Param('id') id: number) {
        return await this.sourceService.getOneSource(+id);
    }

    
}