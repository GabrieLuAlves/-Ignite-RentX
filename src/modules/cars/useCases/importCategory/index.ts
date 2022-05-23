import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUserCase } from './ImportCategotyUseCase';

const categoriesRepository = CategoriesRepository.getInstace();
const importCategoryUseCase = new ImportCategoryUserCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);

export { importCategoryController };
