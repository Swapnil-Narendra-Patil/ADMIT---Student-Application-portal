import * as ApplicationControllers from "../controllers/Application.controller.js";
import express from "express";
import authJwt from "../middlewares/index.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

//storage object for storing application files in the file system
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(path.dirname(__filename));
        const uploadFolder = __dirname + "/uploads/applications/temporary";
        let folderExists = fs.existsSync(uploadFolder);
        if (folderExists) {
            return cb(null, uploadFolder);
        } else {
            return fs.mkdir(uploadFolder, error => cb(error, uploadFolder));
        }
    },
    filename: (req, file, cb) => {
        return cb(null, file.fieldname);
    },
});

//storage object for updatig the application files in the file system
const storageForUpdate = multer.diskStorage({
    destination: (req, file, cb) => {
        const randomUuid = v4();
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(path.dirname(__filename));
        const uploadFolder = __dirname + "/uploads/applications/" + req.params.id;
        let folderExists = fs.existsSync(uploadFolder);
        if (folderExists) {
            return cb(null, uploadFolder);
        } else {
            return fs.mkdir(uploadFolder, error => cb(error, uploadFolder));
        }
    },
    filename: (req, file, cb) => {
        return cb(null, file.fieldname);
    },
});

const upload = multer({
    storage: storage,
});

const uploadUpdate = multer({
    storage: storageForUpdate,
});

const fieldsArray = [
    {
        name: "lor1",
    },
    {
        name: "lor2",
    },
    {
        name: "lor3",
    },
    {
        name: "sop",
    },
    {
        name: "resume",
    },
];

const ApplicationRoutes = express.Router();

ApplicationRoutes.get("/:id", authJwt, ApplicationControllers.getApplicationById);
// ApplicationRoutes.get("/", authJwt, ApplicationControllers.getApplications);
ApplicationRoutes.get("/", ApplicationControllers.getApplications);

ApplicationRoutes.post(
    "/",
    authJwt,
    upload.fields(fieldsArray),
    ApplicationControllers.registerApplication
);

ApplicationRoutes.put(
    "/:id",
    // authJwt,
    uploadUpdate.fields(fieldsArray),
    ApplicationControllers.updateApplication
);

ApplicationRoutes.delete("/:id", authJwt, ApplicationControllers.deleteApplication);

export default ApplicationRoutes;
