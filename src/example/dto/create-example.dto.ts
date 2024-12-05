import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
