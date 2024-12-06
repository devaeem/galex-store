import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name is required' })
  @IsString({ message: 'Product name must be a string' })
  productName: string;

  @IsOptional()
  @IsString({ message: 'Product description must be a string' })
  productDescription?: string;

  @IsNotEmpty({ message: 'Product price is required' })
  @IsNumber({}, { message: 'Product price must be a number' })
  @Transform(({ value }) => parseFloat(value))
  @Min(0, { message: 'Product price must be greater than 0' })
  @Max(1000000, { message: 'Product price must be less than 1,000,000' })
  productPrice: number;

  @IsNotEmpty({ message: 'Product quantity is required' })
  @IsNumber({}, { message: 'Product quantity must be a number' })
  @Transform(({ value }) => parseFloat(value))
  @Min(0, { message: 'Product quantity must be greater than 0' })
  @Max(1000000, { message: 'Product quantity must be less than 1,000,000' })
  productQuantity: number;

  @IsNotEmpty({ message: 'Product category is required' })
  @IsString({ message: 'Product category must be a string' })
  productCategory: string;
}
