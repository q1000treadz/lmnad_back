import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  
  @Entity('files')
  export default class FileEntity {
    public constructor(file: Partial<FileEntity>) {
      Object.assign(this, file);
    }
  
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column( "varchar", { length: 200})
    name: string;

    @ApiProperty()
    @Column( "varchar", { length: 300})
    url: string;
    
    @ApiProperty()
    @Column("varchar", { length: 20,  default: "active"})
    state: string;
}
  