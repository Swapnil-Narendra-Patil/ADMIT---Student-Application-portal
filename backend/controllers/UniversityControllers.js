import { setResponse, setRequestError, setServerError } from "./utils.js";
import University from "../models/university.js";
import path from "path";
import { fileURLToPath } from "url";
import {
    getUniversitiesByIdsService,
    deleteUniversityByIdService,
    getAllUniversitiesService,
    getUniversityByIdService,
    getUniversityImageService,
    saveUniversityService,
    updateUniversityByIdService,
    getUniversityByNameService,
} from "../services/UniversityServices.js";

//register a particular university
export const registerUniversity = async (req, res) => {
    try {
        const universityObj = req.body;
        const savedUniversityObj = await saveUniversityService(universityObj);
        if (!savedUniversityObj) {
            return setRequestError(
                {
                    msg: "Could not register the university",
                },
                res
            );
        }
        return setResponse(savedUniversityObj, res);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal server error",
            },
            res
        );
    }
};

//get all the universtieis
export const getAllUniversities = async (req, res) => {
    var allUniversities = [];
    try {
        if (Object.keys(req.query).includes("ids")) {
            const ids = req.query.ids;
            // check if ids is not an array
            if (!Array.isArray(ids)) {
                return setRequestError({ msg: "Ids should be an array" });
            }
            allUniversities = await getUniversitiesByIdsService(ids);
        }
        // search university by name
        else if (Object.keys(req.query).includes("name")) {
            const name = req.query.name;
            allUniversities = await getUniversityByNameService(name);
        } else if (Object.keys(req.query).length === 0) {
            allUniversities = await getAllUniversitiesService();
        }
        return setResponse(allUniversities, res);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal server error",
            },
            res
        );
    }
};

export const getUniversityById = async (req, res) => {
    try {
        const university = await getUniversityByIdService(req.params.id);
        if (!university) {
            return setRequestError(
                {
                    msg: "Could not find the university",
                },
                res
            );
        }
        return setResponse(university, res);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal server error",
            },
            res
        );
    }
};

//update a university
export const updateUniversityById = async (req, res) => {
    try {
        const currentUniversity = req.body;
        const isUniversityPresent = await University.findById(req.params.id).select(
            "_id"
        );
        if (!isUniversityPresent) {
            return setRequestError(
                {
                    msg: "University does not exist",
                },
                res
            );
        }
        const updatedUniversity = await updateUniversityByIdService(
            req.params.id,
            currentUniversity
        );
        return setResponse(updatedUniversity, res);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal server error",
            },
            res
        );
    }
};

//get a particular image of a university
export const getUniversityImage = async (req, res) => {
    try {
        const universityObj = await getUniversityImageService(req.params.universityId);
        const name = universityObj.images[parseInt(req.params.num)];
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(path.dirname(__filename));
        const fileLocation =
            __dirname + "/uploads/UniversityImages/" + universityObj.name + "/" + name;
        return res.sendFile(fileLocation);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal server error",
            },
            res
        );
    }
};

//delete a university 
export const deleteUniversityById = async (req, res) => {
    try {
        const isUniversityPresent = await University.findById(req.params.id).select(
            "_id"
        );
        if (!isUniversityPresent) {
            return setRequestError(
                {
                    msg: "University does not exist",
                },
                res
            );
        }
        const deletedUniversity = await deleteUniversityByIdService(req.params.id);
        if (!deletedUniversity) {
            return setRequestError(
                {
                    msg: "Could not delete the university",
                },
                res
            );
        }
        return setResponse(deletedUniversity, res);
    } catch (error) {
        console.log(error);
        return setServerError(
            {
                msg: "Internal server error",
            },
            res
        );
    }
};
