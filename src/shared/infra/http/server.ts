import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { AppError } from '@shared/errors/AppError';
import { router } from './routes';

import '@shared/infra/typeorm/index';
import '@shared/container';

import swaggerFile from '../../../swagger.json';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3333, () => console.log('Server is running'));
