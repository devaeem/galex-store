import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class PaginateQueryDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Page is required' })
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsNotEmpty({ message: 'PageSize is required' })
  @Type(() => Number)
  pageSize: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sortType?: 1 | -1;

  @IsString()
  @IsOptional()
  populate?: string;
}
