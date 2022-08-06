import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  const day24hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "12345",
      user_id: "121212",
      expected_return_date: day24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to rent a car to a user who has an unfinished rent", async () => {
    await createRentalUseCase.execute({
      car_id: "carId1",
      user_id: "userId1",
      expected_return_date: day24hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "carId2",
        user_id: "userId1",
        expected_return_date: day24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car that is already rented to another user", async () => {
    await createRentalUseCase.execute({
      car_id: "carId1",
      user_id: "userId1",
      expected_return_date: day24hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "carId1",
        user_id: "userId2",
        expected_return_date: day24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car that is already rented to another user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "carId1",
        user_id: "userId2",
        expected_return_date: dayjs()
          .add(23 * 3600 + 59 * 60 + 59, "seconds")
          .toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
