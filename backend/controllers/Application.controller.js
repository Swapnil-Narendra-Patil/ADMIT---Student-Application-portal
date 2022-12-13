import { renameSync } from "fs";
import Application from "../models/application.js";
import {
    deleteApplicationService,
    getApplicationByIdService,
    registerApplicationService,
    updateApplicationService,
    getApplicationsByStudentId,
    getApplicationsByUniId,
} from "../services/Application.service.js";
import { setRequestError, setResponse, setServerError } from "./utils.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Gets all the applications of a particular user
export const getApplications = async (req, res) => {
    console.log(req.query);
    try {
        // if only StudentId is present in the query
        if (Object.keys(req.query).includes("studentId")) {
            // send response with applications of the student
            const applications = await getApplicationsByStudentId(req.query.studentId);
            setResponse(applications, res);
        }
        // if only UniversityId is present in the query
        else if (Object.keys(req.query).includes("universityId")) {
            // send response with applications of the university
            const applications = await getApplicationsByUniId(req.query.universityId);
            setResponse(applications, res);
        } else if (!req.query) {
            // send error response
            setRequestError(
                "No query parameters found. API doesn't support fetch all applications",
                res
            );
        } else {
            // send error response
            setRequestError(
                "Invalid query parameters. API only supports `studentId` or `universityId`  query parameter",
                res
            );
        }
    } catch (error) {
        console.log(error);
        setServerError(error, res);
    }
};

//Gets an application by id of a particular user
export const getApplicationById = async (req, res) => {
    try {
        const applicationObj = await getApplicationByIdService(req.params.id);
        if (!applicationObj) {
            return setRequestError({ msg: "Could not find the application" }, res);
        }
        setResponse(applicationObj, res);
    } catch (error) {
        console.log(error);
        setServerError(
            {
                msg: "Internal Server Error",
            },
            res
        );
    }
};

//saving or submitting for the first time
export const registerApplication = async (req, res, next) => {
    try {
        console.log(req.body);
        const savedApplicationObj = await registerApplicationService(req.body);
        if (!savedApplicationObj) {
            return setRequestError(
                {
                    msg: "Could not register the applicaton",
                },
                res
            );
        }
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(path.dirname(__filename));
        const oldUploadFolder = __dirname + "/uploads/applications/temporary";
        // making sure that the files have been uploaded
        if (fs.existsSync(oldUploadFolder)) {
            const newUploadFolder =
                __dirname + "/uploads/applications/" + savedApplicationObj.id;
            renameSync(oldUploadFolder, newUploadFolder);
            //saving the file locations to the application object
            Object.keys(req.files).map(fileName => {
                savedApplicationObj[fileName] = newUploadFolder + "/" + fileName;
            });
        }
        if(req.body.status == "submitted"){
            savedApplicationObj.applicationStatus = "In Review";
        }
        await savedApplicationObj.save();
        return setResponse(savedApplicationObj, res);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal Server Error",
            },
            res
        );
    }
};

//updates an application by id
export const updateApplication = async (req, res) => {
    try {
        const isApplicationPresent = await Application.findById(req.params.id).select(
            "_id"
        );
        if (!isApplicationPresent) {
            return setRequestError(
                {
                    msg: "Application does not exist!",
                },
                res
            );
        }
        const newApplicationObj = await updateApplicationService(req.params.id, req.body);

        console.log(req.files);
        //Create folder if does not exist
        if (req.files != undefined && Object.keys(req.files).length > 0) {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(path.dirname(__filename));
            const UploadFolder =
                __dirname + "/uploads/applications/" + newApplicationObj.id;
            if (fs.existsSync(UploadFolder)) {
                Object.keys(req.files).map(fileName => {
                    newApplicationObj[fileName] = UploadFolder + "/" + fileName;
                });
            } else {
                const oldUploadFolder = __dirname + "/uploads/applications/temporary";
                const newUploadFolder =
                    __dirname + "/uploads/applications/" + newApplicationObj.id;
                renameSync(oldUploadFolder, newUploadFolder);
                Object.keys(req.files).map(fileName => {
                    newApplicationObj[fileName] = newUploadFolder + "/" + fileName;
                });
            }
        }
        if(req.body.status == "submitted"){
            if(newApplicationObj.applicationStatus == "Pending"){
                newApplicationObj.applicationStatus = "In Review";
            }
        }
        await newApplicationObj.save();
        console.log("Idhar")

        return setResponse(newApplicationObj, res);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal Server Error",
            },
            res
        );
    }
};

// Used for withdrawing application and delete files if exists
export const deleteApplication = async (req, res) => {
    try {
        console.log(req.params.id);
        const isApplicationPresent = await Application.findById(req.params.id).select(
            "id"
        );
        console.log(isApplicationPresent);
        if (!isApplicationPresent) {
            return setRequestError(
                {
                    msg: "Application does not exist!",
                },
                res
            );
        }
        const deletedObj = await deleteApplicationService(req.params.id);
        if (!deletedObj) {
            return setRequestError(
                {
                    msg: "Could not delete the object",
                },
                res
            );
        }
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(path.dirname(__filename));
        const uploadFolder = __dirname + "/uploads/applications/" + deletedObj.id;
        if (fs.existsSync(uploadFolder)) {
            fs.rmSync(uploadFolder, {
                recursive: true,
                force: true,
            });
        }
        return setResponse(deletedObj, res);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal Server Error",
            },
            res
        );
    }
};
