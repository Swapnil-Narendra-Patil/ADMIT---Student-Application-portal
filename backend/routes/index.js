//Import all the routes here
import StudentRoutes from "./StudentRoutes.js";
import UniversityAdminRoutes from "./UniversityAdmin.route.js";
import UniversityRoutes from "./UniversityRoutes.js";
import ProgramRoutes from "./program.route.js";
// import ExperienceRoutes from "./experience.route.js";
import ApplicationRoutes from "./Application.route.js";

const mainRouter = (app) => {
  //write all your imported routes here
  app.use("/students", StudentRoutes);
  app.use("/universityAdmins", UniversityAdminRoutes);
  app.use("/universities", UniversityRoutes);
  app.use("/programs", ProgramRoutes);
  // app.use("/experiences", ExperienceRoutes);
  app.use("/applications", ApplicationRoutes);
};
export default mainRouter;
