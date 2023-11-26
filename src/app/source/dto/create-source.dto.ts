import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSourceDto {
    @ApiProperty()
    @IsDateString()
    public publish_date: Date;
    
    @ApiProperty()
    @IsString()
    public doi: string;

    @ApiProperty()
    @IsString()
    public bibliographic_reference_harvard: string;
  
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    public file_id: number;
    @ApiProperty()
    @IsNumber({}, { each: true })
    public record_ids: number[];
}

export class CreateSourceDtoNoRecords {
    @ApiProperty()
    @IsDateString()
    public publish_date: Date;
    
    @ApiProperty()
    @IsString()
    public doi: string;

    @ApiProperty()
    @IsString()
    public bibliographic_reference_harvard: string;
  
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    public file_id: number;
}