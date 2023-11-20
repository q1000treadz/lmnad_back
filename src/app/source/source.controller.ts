import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSourceDto } from "./dto/create-source.dto";
import { SourceService } from "./source.service";

@Controller('api/source')
export class SourceController {

    constructor(
        private readonly sourceService: SourceService,
    ){}

    @Post('')
    async createRecord(@Body() createSource: CreateSourceDto) {
        return await this.sourceService.createSource(createSource);
    }

    @Get(':id')
    async getIdByRecord(@Param('id') id: number) {
        return await this.sourceService.getOneSource(+id);
    }

    @Get('')
    async getRecords() {
        return await this.sourceService.getSources();
    }
}