import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'Arroz 5Kg' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiPropertyOptional({
    example: 'Tipo 1',
    description: 'Descrição é opcional',
  })
  @IsString()
  @IsOptional()
  descricao: string;

  @ApiProperty({
    example: 2,
    description: 'A quantidade mínima é 1 unidade',
  })
  @IsInt()
  @Min(1)
  quantidade: number;
}
