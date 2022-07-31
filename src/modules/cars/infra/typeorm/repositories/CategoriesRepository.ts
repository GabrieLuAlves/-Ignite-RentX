import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm";
import { Category } from "../Entities/Category";
import { ICategoryRepository } from "../../../repositories/ICategoriesRepository";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.repository.findOneBy({ name });
    return category;
  }
}

export { CategoriesRepository };
