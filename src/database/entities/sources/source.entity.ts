import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    OneToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
import FileEntity from '../file/file.entity';
import Record from '../record/record.entity';
  
  @Entity('sources')
  export default class Source {
    public constructor(source: Partial<Source>) {
      Object.assign(this, source);
    }
  
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;
  
  
    @ApiProperty()
    @Column({ type: 'timestamp' })
    public publish_date: Date;
    
    @ApiProperty()
    @Column()
    public doi: string;

    @ApiProperty()
    @Column()
    public bibliographic_reference_harvard: string;
    @ApiProperty({ type: [Record] })
    @ManyToMany(() => Record, record => record.sources)
    public records?: Record[];

    @ApiProperty({ type: () => FileEntity })
    @ManyToOne(() => FileEntity, {nullable: true})
    @JoinColumn({name: 'file_id'})
    public file: FileEntity;
  }
  