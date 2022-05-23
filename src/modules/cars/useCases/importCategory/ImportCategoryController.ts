import { Request, Response } from 'express';
import { ImportCategoryUserCase } from './ImportCategotyUseCase';

class ImportCategoryController {
  private importCategoryUseCase: ImportCategoryUserCase;

  constructor(importCategoryUseCase: ImportCategoryUserCase) {
    this.importCategoryUseCase = importCategoryUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { file } = request;

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
