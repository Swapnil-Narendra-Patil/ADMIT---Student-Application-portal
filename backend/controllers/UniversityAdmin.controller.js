import { UniversityAdmin } from "../models/index.js";
import {
  deleteUniversityAdminById,
  getUniversityAdminById,
  saveUniversityAdmin,
  updateUniversityAdminById,
  loginUniversityAdminService,
} from "../services/UniversityAdmin.services.js";
import { setResponse, setRequestError, setServerError } from "./utils.js";

const registerUniversityAdmin = async (req, res) => {
  try {
    var universityAdminObj = req.body;
    const isUniversityAdminPresent = await UniversityAdmin.exists({
      email: universityAdminObj.email,
    });
    if (isUniversityAdminPresent) {
      return setRequestError({ msg: "UniversityAdmin already exists!" }, res);
    }
    const savedUniversityAdmin = await saveUniversityAdmin(universityAdminObj);
    return setResponse(savedUniversityAdmin, res);
  } catch (error) {
    console.log(error);
    return setServerError({ msg: "Internal server error" }, res);
  }
};

const getUniversityAdmin = async (req, res) => {
  try {
    const universityAdminObj = await getUniversityAdminById(req.params.id);
    if (universityAdminObj) {
      return setResponse(universityAdminObj, res);
    }
    return setRequestError({ msg: "UniversityAdmin does not exist!" }, res);
  } catch (error) {
    console.log(error);
    return setRequestError({ msg: "Internal server error" }, res);
  }
};

const updateUniversityAdmin = async (req, res) => {
  try {
    const currentUniversityAdmin = req.body;
    const isUniversityAdminPresent = await UniversityAdmin.findById(
      req.params.id
    ).select("_id");
    if (isUniversityAdminPresent._id.toString() != req.userId) {
      // added this to make sure that universityAdmins can only update thier own profile
      return setRequestError({ msg: "Not authorized" }, res);
    }
    console.log(isUniversityAdminPresent);
    if (!isUniversityAdminPresent) {
      return setRequestError({ msg: "UniversityAdmin does not exist!" }, res);
    }
    const updatedUniversityAdmin = await updateUniversityAdminById(
      req.params.id,
      currentUniversityAdmin
    );
    if (updatedUniversityAdmin) {
      return setResponse(updatedUniversityAdmin, res);
    }
    return setRequestError(
      { msg: "Could not update the universityAdmin!" },
      res
    );
  } catch (error) {
    console.log(error);
    return setRequestError({ msg: "Internal server error" }, res);
  }
};

const deleteUniversityAdmin = async (req, res) => {
  try {
    const isUniversityAdminPresent = await UniversityAdmin.findById(
      req.params.id
    ).select("_id");
    if (isUniversityAdminPresent._id.toString() != req.userId) {
      // added this to make sure that universityAdmins can only delete thier own profile
      return setRequestError({ msg: "Not authorized" }, res);
    }
    const deletedOj = await deleteUniversityAdminById(req.params.id);
    return setResponse(deletedOj, res);
  } catch (error) {
    console.log(error);
    return setRequestError({ msg: "Internal server error" }, res);
  }
};

const loginUniversityAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const universityAdminObj = await loginUniversityAdminService(
      email,
      password
    );
    if (!universityAdminObj) {
      return setRequestError({ msg: "Incorrect credentials!" }, res);
    }
    return setResponse(universityAdminObj, res);
  } catch (error) {
    console.log(error);
    return setRequestError({ msg: "Internal server error" }, res);
  }
};

export {
  registerUniversityAdmin,
  getUniversityAdmin,
  updateUniversityAdmin,
  deleteUniversityAdmin,
  loginUniversityAdmin,
};
