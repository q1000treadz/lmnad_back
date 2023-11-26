import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import FileEntity from '../file/file.entity';
import { FileRecord } from '../file-record/file-record.entity';
import Source from '../sources/source.entity';

@Entity('records')
export default class Record {
  public constructor(record: Partial<Record>) {
    Object.assign(this, record);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column('float')
  public latitude: number;

  @ApiProperty()
  @Column('float')
  public longitude: number;

  @ApiProperty()
  @Column('varchar')
  public information: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  public start_date: Date;
  @ApiProperty()
  @Column({ type: 'timestamp' })
  public end_date: Date;

  @ApiProperty()
  @Column('varchar')
  public wave_types: string;
  @ApiProperty({ description: 'Характеристика пространства(масштаб)'})
  @Column()
  public scale: string;
  @ApiProperty({ description: 'Погода'})
  @Column({nullable: true})
  public weather: string;
  @ApiProperty({ description: 'Источник генерации'})
  @Column()
  public source_generation: string;


  @ApiProperty({ type: [Source] })
  @ManyToMany(() => Source, source => source.records, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true })
  @JoinTable({
    name: 'records_sources',
    joinColumn: {
      name: 'record_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'source_id',
      referencedColumnName: 'id',
    },
  })
  public sources: Source[];



  @ApiProperty({ type: () => FileRecord })
  @OneToMany(() => FileRecord, (record_file) => record_file.record, {
    nullable: true,
  })
  public record_files?: FileRecord[];
}
