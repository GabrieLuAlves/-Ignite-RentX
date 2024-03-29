import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, driver_license, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      driver_license,
      password,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
