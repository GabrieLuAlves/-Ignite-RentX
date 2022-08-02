import { Car } from "@modules/cars/infra/typeorm/Entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  brand?: string;
  category_id?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    return this.carsRepository.findAvailable(brand, category_id, name);
  }
}

export { ListAvailableCarsUseCase };
