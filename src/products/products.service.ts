import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateQueryDto } from 'src/common/paginatedto';
import { PaginateResponse } from 'src/common/inteface/respone';

type SortQuery = { [key: string]: 1 | -1 };

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async FindOperationginate(
    query: PaginateQueryDto,
  ): Promise<PaginateResponse<Product>> {
    const { page, pageSize, search, sort, sortType, populate } = query;
    const skip = (page - 1) * pageSize;

    const searchQuery = search
      ? { productName: { $regex: search, $options: 'i' } }
      : {};

    const keyPopulate = populate ? populate : [];

    const sortQuery = sort ? { [sort]: sortType ? sortType : 1 } : {};

    const categories = await this.productModel
      .find({ isDeleted: false, ...searchQuery })
      .skip(skip)
      .limit(pageSize)
      .sort(sortQuery as SortQuery)
      .populate(keyPopulate);
    const total = await this.productModel.countDocuments({ isDeleted: false });

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

  async create(createDto: CreateProductDto): Promise<Product> {
    const example = await this.productModel.create(createDto);
    return example.save();
  }

  async update(id: string, updateDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateDto);
  }

  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, { isDeleted: true });
  }

  async findById(id: string, populate?: string[]): Promise<Product> {
    const keyPopulate = populate ? populate : [];
    return this.productModel.findById(id).populate(keyPopulate);
  }
}
