import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../../shared/infra/typeorm/data-source";
import { ICreateUserDTO } from "../../../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      id,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOneBy({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.repository.findOneBy({ id });

    return user;
  }
}

export { UsersRepository };
