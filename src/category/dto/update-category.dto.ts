import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  categoryName: string;
}
