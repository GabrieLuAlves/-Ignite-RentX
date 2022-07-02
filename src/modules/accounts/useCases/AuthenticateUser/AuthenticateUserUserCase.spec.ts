import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUserRepository } from '../../repositories/IUserRepository';
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: IUserRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to authenticate user', async () => {
    const user: ICreateUserDTO = {
      name: 'User 01',
      email: 'user01@email.com',
      password: 'User password 01',
      driver_license: '010101',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'nonexistent@email.com',
        password: 'fakepassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User 01',
        email: 'user01@email.com',
        password: 'User password 01',
        driver_license: '010101',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongpassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
