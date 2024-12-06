import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateExampleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
