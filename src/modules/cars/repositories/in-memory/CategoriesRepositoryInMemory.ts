import { Category } from '../../Entities/Category';

import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoryRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
