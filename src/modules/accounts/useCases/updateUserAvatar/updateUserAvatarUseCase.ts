import { inject, injectable } from 'tsyringe';
import { deleteFile } from '@shared/utils/file';

import { IUserRepository } from '../../infra/typeorm/repositories/IUserRepository';

interface IRequest {
  id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    return this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
