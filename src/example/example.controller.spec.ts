import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { HttpStatus } from '@nestjs/common';
import { PaginateQueryDto } from 'src/common/paginatedto';

describe('ExampleController', () => {
  let exampleController: ExampleController;
  let exampleService: ExampleService;

  const mockExampleService = {
    create: jest.fn(),
    FindOperationginate: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        {
          provide: ExampleService,
          useValue: mockExampleService,
        },
      ],
    }).compile();

    exampleController = module.get<ExampleController>(ExampleController);
    exampleService = module.get<ExampleService>(ExampleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new example and return success response', async () => {
      const createDto: CreateExampleDto = {
        name: 'Test Example',
        description: 'Test Description',
      };
      const createdExample: any = {
        _id: '123',
        name: 'Test Example',
        description: 'Test Description',
        isDeleted: false,
      };

      mockExampleService.create.mockResolvedValue(createdExample);

      const result = await exampleController.create(createDto);

      expect(exampleService.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({
        status: HttpStatus.CREATED,
        message: 'Created successfully',
        data: createdExample,
      });
    });

    it('should handle errors and return error response', async () => {
      const createDto: CreateExampleDto = {
        name: 'Test Example',
        description: 'Test Description',
      };
      const errorMessage = 'Creation failed';

      mockExampleService.create.mockRejectedValue(new Error(errorMessage));

      const result = await exampleController.create(createDto);

      expect(exampleService.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated examples', async () => {
      const query: PaginateQueryDto = {
        page: 1,
        pageSize: 10,
      };
      const paginatedResult = {
        /* populate with paginated data */
      };

      mockExampleService.FindOperationginate.mockResolvedValue(paginatedResult);

      const result = await exampleController.findAll(query);

      expect(exampleService.FindOperationginate).toHaveBeenCalledWith(query);
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Fetched successfully',
        data: paginatedResult,
      });
    });

    it('should handle errors and return error response', async () => {
      const query: PaginateQueryDto = {
        page: 1,
        pageSize: 10,
        /* populate with pagination parameters */
      };
      const errorMessage = 'Fetch failed';

      mockExampleService.FindOperationginate.mockRejectedValue(
        new Error(errorMessage),
      );

      const result = await exampleController.findAll(query);

      expect(exampleService.FindOperationginate).toHaveBeenCalledWith(query);
      expect(result).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe('findById', () => {
    it('should return an example by ID', async () => {
      const id = '123';
      const foundExample: any = {
        _id: '123',
        name: 'Test Example',
        description: 'Test Description',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockExampleService.findById.mockResolvedValue(foundExample);

      const result = await exampleController.findById(id);

      expect(exampleService.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Fetched successfully',
        data: foundExample,
      });
    });

    it('should handle errors and return error response', async () => {
      const id = '123';
      const errorMessage = 'Fetch by ID failed';

      mockExampleService.findById.mockRejectedValue(new Error(errorMessage));

      const result = await exampleController.findById(id);

      expect(exampleService.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe('update', () => {
    it('should update an existing example and return success response', async () => {
      const id = '123';
      const updateDto: UpdateExampleDto = {
        name: 'Updated Example',
        description: 'Updated Description',
      };
      const updatedExample: any = {
        _id: '123',
        name: 'Updated Example',
        description: 'Updated Description',
        isDeleted: false,
      };

      mockExampleService.update.mockResolvedValue(updatedExample);

      const result = await exampleController.update(id, updateDto);

      expect(exampleService.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Updated successfully',
        data: updatedExample,
      });
    });

    it('should handle errors and return error response', async () => {
      const id = '123';
      const updateDto: UpdateExampleDto = {
        name: 'Updated Example',
        description: 'Updated Description',
      };
      const errorMessage = 'Update failed';

      mockExampleService.update.mockRejectedValue(new Error(errorMessage));

      const result = await exampleController.update(id, updateDto);

      expect(exampleService.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
        data: null,
      });
    });
  });

  describe('delete', () => {
    it('should delete an example and return success response', async () => {
      const id = '123';
      const deletedExample: any = {
        _id: '123',
        name: 'Deleted Example',
        description: 'Deleted Description',
        isDeleted: true,
      };

      mockExampleService.delete.mockResolvedValue(deletedExample);

      const result = await exampleController.delete(id);

      expect(exampleService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Deleted successfully',
        data: deletedExample,
      });
    });

    it('should handle errors and return error response', async () => {
      const id = '123';
      const errorMessage = 'Deletion failed';

      mockExampleService.delete.mockRejectedValue(new Error(errorMessage));

      const result = await exampleController.delete(id);

      expect(exampleService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Deletion failed',
        data: null,
      });
    });
  });
});
