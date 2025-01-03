import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  preco: string;

  @IsNotEmpty()
  @IsString()
  quantidade: string;
}
