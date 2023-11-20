import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateFileRecord {
    @ApiProperty()
    @IsNumber()
    public file_id: number;

    @ApiProperty()
    @IsString()
    public file_type: string;
}