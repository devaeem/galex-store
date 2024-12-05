import { IsNotEmpty, IsNumber } from 'class-validator';
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
}
