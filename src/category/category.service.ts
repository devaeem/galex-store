import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginateQueryDto } from 'src/common/paginatedto';
import { PaginateResponse } from 'src/common/inteface/respone';

type SortQuery = {
  [key: string]: 1 | -1;
};
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async FindOperationginate(
    query: PaginateQueryDto,
  ): Promise<PaginateResponse<Category>> {
    const { page, pageSize, search, sort, sortType, populate } = query;
    const skip = (page - 1) * pageSize;

    const searchQuery = search
      ? { categoryName: { $regex: search, $options: 'i' } }
      : {};

    const keyPopulate = populate ? populate : [];

    const sortQuery = sort ? { [sort]: sortType ? sortType : 1 } : {};

    const categories = await this.categoryModel
      .find({ isDeleted: false, ...searchQuery })
      .skip(skip)
      .limit(pageSize)
      .sort(sortQuery as SortQuery)
      .populate(keyPopulate);
    const total = await this.categoryModel.countDocuments({ isDeleted: false });

    const totalPages = Math.ceil(total / pageSize);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      rows: categories,
      page,
      pageSize,
      totalPages,
      hasNext,
      hasPrevious,
    };
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const example = await this.categoryModel.create(createCategoryDto);
    return example.save();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async delete(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, { isDeleted: true });
  }

  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }
}
