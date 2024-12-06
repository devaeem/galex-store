import { Injectable } from '@nestjs/common';
// import { CreateExampleDto } from './dto/create-example.dto';
// import { UpdateExampleDto } from './dto/update-example.dto';
// import { ExampleRepository } from './example.repo';
import { InjectModel } from '@nestjs/mongoose';
import { Example } from './entities/example.entity';
import { Model } from 'mongoose';
import { PaginateQueryDto } from 'src/common/paginatedto';
import { PaginateResponse } from 'src/common/inteface/respone';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

type SortQuery = {
  [key: string]: 1 | -1;
};
@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(Example.name) private exampleModel: Model<Example>,
  ) {}

  async FindOperationginate(
    query: PaginateQueryDto,
  ): Promise<PaginateResponse<Example>> {
    const { page, pageSize, search, sort, sortType } = query;
    const skip = (page - 1) * pageSize;

    const searchQuery = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const sortQuery = sort ? { [sort]: sortType ? sortType : 1 } : {};

    const examples = await this.exampleModel
      .find({ isDeleted: false, ...searchQuery })
      .skip(skip)
      .limit(pageSize)
      .sort(sortQuery as SortQuery);
    const total = await this.exampleModel.countDocuments({ isDeleted: false });

    const totalPages = Math.ceil(total / pageSize);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      rows: examples,
      page,
      pageSize,
      totalPages,
      hasNext,
      hasPrevious,
    };
  }

  async create(createExampleDto: CreateExampleDto): Promise<Example> {
    const example = await this.exampleModel.create(createExampleDto);
    return example.save();
  }

  async update(
    id: string,
    updateExampleDto: UpdateExampleDto,
  ): Promise<Example> {
    return this.exampleModel.findByIdAndUpdate(id, updateExampleDto);
  }

  async delete(id: string): Promise<Example> {
    return this.exampleModel.findByIdAndUpdate(id, { isDeleted: true });
  }

  async findById(id: string): Promise<Example> {
    return this.exampleModel.findById(id);
  }
}
