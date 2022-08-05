import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "12345",
      user_id: "121212",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to rent a car to a user who has an unfinished rent", async () => {
    await createRentalUseCase.execute({
      car_id: "carId1",
      user_id: "userId1",
      expected_return_date: new Date(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "carId2",
        user_id: "userId1",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car that is already rented to another user", async () => {
    await createRentalUseCase.execute({
      car_id: "carId1",
      user_id: "userId1",
      expected_return_date: new Date(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "carId1",
        user_id: "userId2",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
