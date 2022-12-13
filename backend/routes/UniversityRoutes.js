import express from "express";
import authJwt from "../middlewares/index.js";
import * as UniversityControllers from "../controllers/UniversityControllers.js";

const UniversityRoutes = express.Router();

//CRUD for university

UniversityRoutes.post("/", authJwt, UniversityControllers.registerUniversity);

UniversityRoutes.get("/", UniversityControllers.getAllUniversities);

// UniversityRoutes.get("/", (req, res) => {
//     console.log(req.query);
//     res.send(req.query);
// });

UniversityRoutes.get("/:id", authJwt, UniversityControllers.getUniversityById);

UniversityRoutes.put(
  "/:id",
  authJwt,
  UniversityControllers.updateUniversityById
);

UniversityRoutes.delete(
  "/:id",
  authJwt,
  UniversityControllers.deleteUniversityById
);

UniversityRoutes.get(
  "/university-images/:universityId/:num",
  authJwt,
  UniversityControllers.getUniversityImage
);

export default UniversityRoutes;
