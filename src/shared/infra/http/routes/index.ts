import "reflect-metadata";
import { Router } from "express";
import { authenticationRoutes } from "./authentication.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { rentalRoutes } from "./rental.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);

router.use(authenticationRoutes);

export { router };
