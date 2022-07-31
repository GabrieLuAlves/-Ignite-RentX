import { container } from "tsyringe";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/implementations/UsersRepository";
import { IUserRepository } from "@modules/accounts/infra/typeorm/repositories/IUserRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository,
);

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
