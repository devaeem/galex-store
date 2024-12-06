import { Test, TestingModule } from '@nestjs/testing';
import { ExampleService } from './example.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Example } from './entities/example.entity';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

describe('ExampleService', () => {
  let service: ExampleService;
  let model: Model<Example> & { [K in keyof Model<Example>]: jest.Mock };

  const mockExample = (overrides = {} as Example): Example => ({
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Example',
    isDeleted: false,
    description: 'Test Description',
  });

  const mockExampleModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    countDocuments: jest.fn(),
  } as unknown as Model<Example> & { [K in keyof Model<Example>]: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: getModelToken(Example.name),
          useValue: mockExampleModel,
        },
      ],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
    model = module.get<Model<Example>>(getModelToken(Example.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('FindOperationginate', () => {
    it('should return paginated results', async () => {
      const query = {
        page: 1,
        pageSize: 10,
        search: '',
        sort: 'name',
        sortType: 1,
      };
      const examples = [mockExample()];
      model.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(examples),
      });
      model.countDocuments.mockResolvedValue(1);

      const result = await service.FindOperationginate(query);

      expect(result).toEqual({
        rows: examples,
        page: 1,
        pageSize: 10,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      });
      expect(model.find).toHaveBeenCalledWith({
        isDeleted: false,
        name: { $regex: '', $options: 'i' },
      });
      expect(model.countDocuments).toHaveBeenCalledWith({ isDeleted: false });
    });
  });

  describe('create', () => {
    it('should create and return a new example', async () => {
      const dto: CreateExampleDto = {
        name: 'New Example',
        description: 'New Description',
      };
      const createdExample = mockExample(dto);
      model.create.mockResolvedValue(createdExample);
      jest.spyOn(createdExample, 'save').mockResolvedValue(createdExample);

      const result = await service.create(dto);

      expect(model.create).toHaveBeenCalledWith(dto);
      expect(createdExample.save).toHaveBeenCalled();
      expect(result).toEqual(createdExample);
    });
  });

  describe('update', () => {
    it('should update and return the updated example', async () => {
      const dto: UpdateExampleDto = { name: 'Updated Example' };
      const updatedExample = mockExample(dto);
      model.findByIdAndUpdate.mockResolvedValue(updatedExample);

      const result = await service.update('507f1f77bcf86cd799439011', dto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        dto,
      );
      expect(result).toEqual(updatedExample);
    });
  });

  describe('delete', () => {
    it('should mark the example as deleted', async () => {
      const deletedExample = mockExample({ isDeleted: true });
      model.findByIdAndUpdate.mockResolvedValue(deletedExample);

      const result = await service.delete('507f1f77bcf86cd799439011');

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        { isDeleted: true },
      );
      expect(result).toEqual(deletedExample);
    });
  });

  describe('findById', () => {
    it('should return the example by id', async () => {
      const example = mockExample();
      model.findById.mockResolvedValue(example);

      const result = await service.findById('507f1f77bcf86cd799439011');

      expect(model.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(result).toEqual(example);
    });
  });
});
