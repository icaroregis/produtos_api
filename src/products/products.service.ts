import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number) {
    try {
      const product = await this.prismaService.produto.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error fetching product: ' + error.message);
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const productAlreadyExists = await this.prismaService.produto.findFirst({
        where: {
          nome: createProductDto.nome,
        },
      });

      if (productAlreadyExists) {
        throw new ConflictException('Product with this name already exists');
      }

      const product = await this.prismaService.produto.create({
        data: {
          ...createProductDto,
        },
      });

      return product;
    } catch (error) {
      throw new BadRequestException('Error creating product: ' + error.message);
    }
  }

  async findAll() {
    try {
      const products = await this.prismaService.produto.findMany();
      return products;
    } catch (error) {
      throw new BadRequestException(
        'Error fetching products: ' + error.message,
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.findById(id);

      const product = await this.prismaService.produto.update({
        where: {
          id,
        },
        data: {
          ...updateProductDto,
        },
      });

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating product: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.findById(id);

      const product = await this.prismaService.produto.delete({
        where: {
          id,
        },
      });
      return product;
    } catch (error) {
      throw new BadRequestException('Error deleting product: ' + error.message);
    }
  }
}
