import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const authenticationRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post("/session", authenticateUserController.handle);

export { authenticationRoutes };
