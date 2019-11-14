import { Test } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductRepository } from './product.repository';
import { GetProductsFilterDto } from './dto/product.dto';
import { ProductStatus } from './product.model';

const mockUser = { username: 'Test user' };

const mockProductRepository = () => ({
  getProducts: jest.fn(),
});

describe('ProductsService', () => {
  let productsService;
  let producRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();
    productsService = await module.get<ProductsService>(ProductsService);
    producRepository = await module.get<ProductRepository>(ProductRepository);
  });

  describe('getProducts', () => {
    it('gets all products from the repository', () => {
      producRepository.getProducts.mockResolvedValue('someValue');
      expect(producRepository.getProducts).not.toHaveBeenCalled();

      const filters: GetProductsFilterDto = {
        status: ProductStatus.IN_PROGRESS,
        search: 'Some search query',
      };

      productsService.getProducts(filters, mockUser);
      expect(producRepository.getProducts).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getProductById', () => {
    it('calls productRepository.findOne()');
  });
});
