import { Controller, Get, Query } from '@nestjs/common';
import { ExampleService } from './example.service';
// import { CreateExampleDto } from './dto/create-example.dto';
// import { UpdateExampleDto } from './dto/update-example.dto';
import { PaginateQueryDto } from 'src/common/paginatedto';
import { Response } from 'src/common/inteface/respone';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  // @Post()
  // create(@Body() createExampleDto: CreateExampleDto) {
  //   return this.exampleService.create(createExampleDto);
  // }

  @Get()
  async findAll(@Query() query: PaginateQueryDto): Promise<Response<any>> {
    const result = await this.exampleService.FindOperationginate(query);
    return { status: 200, message: 'Success', data: result };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.exampleService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExampleDto: UpdateExampleDto) {
  //   return this.exampleService.update(id, updateExampleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.exampleService.remove(id);
  // }
}
