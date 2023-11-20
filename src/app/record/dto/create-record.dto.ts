import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateFileRecord } from "./create-file-record.dto";
import { Type } from "class-transformer";

export class CreateRecordDto {
    @ApiProperty()
    @IsNumber()
    public latitude: number;

    @ApiProperty()
    @IsNumber()
    public longitude: number;
  
    @ApiProperty()
    @IsString()
    public information: string;
  
    @ApiProperty()
    @IsDateString()
    public start_date: Date;
    @ApiProperty()
    @IsDateString()
    public end_date: Date;
  
    @ApiProperty()
    @IsString()
    public wave_types: string;
    // @IsString({ each: true })
    // public wave_types: string[];
    @ApiProperty({ description: 'Характеристика пространства(масштаб)'})
    @IsString()
    public scale: string;
    @ApiProperty({ description: 'Источник генерации'})
    @IsString()
    public source_generation: string;
  

    @ApiProperty({type: () => [CreateFileRecord]})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFileRecord)
    public file_records: CreateFileRecord[];
}