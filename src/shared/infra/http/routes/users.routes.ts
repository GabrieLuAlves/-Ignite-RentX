import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/createUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRoutes };
