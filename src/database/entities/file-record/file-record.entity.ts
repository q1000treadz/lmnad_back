import { ApiProperty } from "@nestjs/swagger";
import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import FileEntity from "../file/file.entity";
import Record from "../record/record.entity";

@Entity('file-record')
export class FileRecord {
    public constructor(fileRec: Partial<FileRecord>) {
      Object.assign(this, fileRec);
    }
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;
  
    @ApiProperty({ type: () => Record })
    @ManyToOne(() => Record, (rec) => rec.record_files)
    @JoinColumn({name: 'record_id'})
    public record: Record;
    
    @ApiProperty({ type: () => FileEntity })
    @ManyToOne(() => FileEntity)
    @JoinColumn({name: 'file_id'})
    public file: FileEntity;

    @ApiProperty()
    @Column('varchar')
    public file_type: string;
}