import { CarImage } from "@modules/cars/infra/typeorm/Entities/CarImage";

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
