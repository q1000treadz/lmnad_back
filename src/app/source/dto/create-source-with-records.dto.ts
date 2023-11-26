import { CreateRecordDto } from "src/app/record/dto/create-record.dto";
import { CreateSourceDto, CreateSourceDtoNoRecords } from "./create-source.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested, IsArray } from "class-validator";

export class CreateSourceWithRecordsDto {
    @ApiProperty({type: () => CreateSourceDtoNoRecords})
    @ValidateNested({ each: true })
    @Type(() => CreateSourceDtoNoRecords)
    public source: CreateSourceDtoNoRecords;
    @ApiProperty({type: () => [CreateRecordDto]})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateRecordDto)
    public records: CreateRecordDto[];

}