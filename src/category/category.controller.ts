import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { PaginateQueryDto } from 'src/common/paginatedto';
import { Response } from 'src/common/inteface/respone';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Response<Category>> {
    try {
      const result = await this.categoryService.create(createCategoryDto);
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
      const result = await this.categoryService.FindOperationginate(query);
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
  async findById(@Param('id') id: string): Promise<Response<Category>> {
    try {
      const result = await this.categoryService.findById(id);
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
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Response<Category>> {
    try {
      const result = await this.categoryService.update(id, updateCategoryDto);
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
  async delete(@Param('id') id: string): Promise<Response<Category>> {
    try {
      const result = await this.categoryService.delete(id);
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
