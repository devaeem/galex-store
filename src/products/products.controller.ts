import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginateQueryDto } from 'src/common/paginatedto';
import { Response } from 'src/common/inteface/respone';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createDto: CreateProductDto,
  ): Promise<Response<Product>> {
    try {
      const result = await this.productsService.create(createDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Created successfully',
        data: result,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          data: null,
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
      };
    }
  }

  @Get()
  async findAll(@Query() query: PaginateQueryDto): Promise<Response<any>> {
    try {
      const result = await this.productsService.FindOperationginate(query);
      return {
        status: HttpStatus.OK,
        message: 'Fetched successfully',
        data: result,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          data: null,
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
      };
    }
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Query('populate') populate?: string[],
  ): Promise<Response<Product>> {
    try {
      const result = await this.productsService.findById(id, populate);
      return {
        status: HttpStatus.OK,
        message: 'Fetched successfully',
        data: result,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          data: null,
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
  ): Promise<Response<Product>> {
    try {
      const result = await this.productsService.update(id, updateDto);
      return {
        status: HttpStatus.OK,
        message: 'Updated successfully',
        data: result,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          data: null,
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Response<Product>> {
    try {
      const result = await this.productsService.delete(id);
      return {
        status: HttpStatus.OK,
        message: 'Deleted successfully',
        data: result,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          data: null,
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
      };
    }
  }
}
