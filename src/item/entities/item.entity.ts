import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  codigo: string;

  @Column({ name: 'nome', type: 'varchar', length: 100, unique: true })
  nome: string;

  @Column({ name: 'descricao', type: 'varchar', length: 256 })
  descricao: string;

  @Column({ name: 'quantidade', type: 'int' })
  quantidade: number;

  @CreateDateColumn({
    name: 'criado_em',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  criadoEm: Date;
}
