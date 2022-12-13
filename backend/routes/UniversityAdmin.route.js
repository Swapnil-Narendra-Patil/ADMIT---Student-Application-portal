import * as UniversityAdminControllers from "../controllers/UniversityAdmin.controller.js";
import express from "express";
import authJwt from "../middlewares/index.js";

const UniversityAdminRoutes = express.Router();

UniversityAdminRoutes.post(
  "/signup",
  UniversityAdminControllers.registerUniversityAdmin
);

UniversityAdminRoutes.post(
  "/login",
  UniversityAdminControllers.loginUniversityAdmin
);

UniversityAdminRoutes.get(
  "/:id",
  authJwt,
  UniversityAdminControllers.getUniversityAdmin
);

UniversityAdminRoutes.put(
  "/:id",
  authJwt,
  UniversityAdminControllers.updateUniversityAdmin
);

UniversityAdminRoutes.delete(
  "/:id",
  authJwt,
  UniversityAdminControllers.deleteUniversityAdmin
);

export default UniversityAdminRoutes;
