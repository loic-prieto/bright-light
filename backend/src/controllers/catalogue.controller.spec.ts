import { Test, TestingModule } from '@nestjs/testing';
import { CatalogueController } from './catalogue.controller';

describe('AppController', () => {
  let catalogueController: CatalogueController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatalogueController],
      providers: [],
    }).compile();

    catalogueController = app.get<CatalogueController>(CatalogueController);
  });

  describe('root', () => {
    it('should return a promise', () => {
      expect(catalogueController.getCatalogueList()).toBe([]);
    });
  });
});
