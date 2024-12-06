import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { PaginateQueryDto } from 'src/common/paginatedto';
import { Response } from 'src/common/inteface/respone';
import { CreateExampleDto } from './dto/create-example.dto';
import { Example } from './entities/example.entity';
import { HttpStatus } from '@nestjs/common';
import { UpdateExampleDto } from './dto/update-example.dto';
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  async create(
    @Body() createExampleDto: CreateExampleDto,
  ): Promise<Response<Example>> {
    try {
      const result = await this.exampleService.create(createExampleDto);
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
      const result = await this.exampleService.FindOperationginate(query);
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
  async findById(@Param('id') id: string): Promise<Response<Example>> {
    try {
      const result = await this.exampleService.findById(id);
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
    @Body() updateExampleDto: UpdateExampleDto,
  ): Promise<Response<Example>> {
    try {
      const result = await this.exampleService.update(id, updateExampleDto);
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
  async delete(@Param('id') id: string): Promise<Response<Example>> {
    try {
      const result = await this.exampleService.delete(id);
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
