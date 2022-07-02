import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/accounts/entities/User';
import { Category } from '../modules/cars/Entities/Category';
import { Specification } from '../modules/cars/Entities/Specification';

import { CreateCategories1653696958537 } from './migrations/1653696958537-CreateCategories';
import { CreateSpecifications1653762596834 } from './migrations/1653762596834-CreateSpecifications';
import { CreateUsers1653869582974 } from './migrations/1653869582974-CreateUsers';
import { AlterUserDeleteUsername1653879351054 } from './migrations/1653879351054-AlterUserDeleteUsername';
import { AlterUserAddAvatar1656592156408 } from './migrations/1656592156408-AlterUserAddAvatar';

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  entities: [Category, Specification, User],
  migrations: [
    CreateCategories1653696958537,
    CreateSpecifications1653762596834,
    CreateUsers1653869582974,
    AlterUserDeleteUsername1653879351054,
    AlterUserAddAvatar1656592156408,
  ],
});
