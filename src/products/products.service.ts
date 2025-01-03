import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    const product = this.prismaService.produto.create({
      data: {
        ...createProductDto,
      },
    });

    return product;
  }

  findAll() {
    return this.prismaService.produto.findMany();
  }

  findOne(id: number) {
    return this.prismaService.produto.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.prismaService.produto.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
      },
    });

    return product;
  }

  remove(id: number) {
    return this.prismaService.produto.delete({
      where: {
        id,
      },
    });
  }
}
