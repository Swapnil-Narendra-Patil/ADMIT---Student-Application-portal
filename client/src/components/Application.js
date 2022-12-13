import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { applicationFormSave, getApplication, withdrawApplication } from "../actions/application.js";
import { apiSlice } from "../api/apiSlice.js";
// import { useAppDispatch } from './store/hooks'

function Application(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [applicationForm, setApplicationForm] = useState({
        createdBy: "",
        createdByEmail: "",
        gender: "",
        dateOfBirth: "",
        applyingTo: "",
        semIntake: "",
        programName: "",
        specialization: "",
        lor1: "",
        lor2: "",
        lor3: "",
        sop: "",
        resume: "",
    });

    //file states
    const [sop, setsop] = useState({ preview: "", data: "" });

    const [lor1, setlor1] = useState({ preview: "", data: "" });

    const [lor2, setlor2] = useState({ preview: "", data: "" });

    const [lor3, setlor3] = useState({ preview: "", data: "" });

    const [resume, setresume] = useState({ preview: "", data: "" });

    const onSubmitHandler = async (e, status) => {
        e.preventDefault();
        const filesUploaded = {
            sop,
            lor1,
            lor2,
            lor3,
            resume,
        };
        var id = null;
        if (props.application._id != null) {
            id = props.application._id;
        }
        await props.applicationFormSave(
            applicationForm,
            filesUploaded,
            status,
            id,
            props.university._id,
            props.auth.user._id
        );
        navigate("/dashboard");
        dispatch(
            apiSlice.endpoints.getApplicationsByStudentId.initiate(props.auth.user._id, {
                subscribe: false,
                forceRefetch: true,
            })
        );
    };

    const onwWithdrawApplication = async (e) => {
        e.preventDefault();
        await props.withdrawApplication(props.application._id);
        navigate("/dashboard");
    }

    const [specializations, setSpecializations] = useState([]);
//Load the state as soon as the component mounts
    useEffect(() => {
        setApplicationForm({
            createdBy: props.auth.user.name,
            createdByEmail: props.auth.user.email,
            gender: props.auth.user.gender,
            dateOfBirth: props.auth.user.dateOfBirth,
            applyingTo: props.university.name,
            semIntake: props.application.semIntake,
            programName: props.application.programName,
            specialization: props.application.specialization,
            lor1: props.application.lor1,
            lor2: props.application.lor2,
            lor3: props.application.lor3,
            sop: props.application.sop,
            resume: props.application.resume,
        });
    }, []);

    const onChangeHandler = e => {
        console.log(e.target.name, e.target.value);
        setApplicationForm(applicationForm => {
            return {
                ...applicationForm,
                [e.target.name]: e.target.value,
            };
        });
    };
//selects the specialization list of a particular program
    const selectProgramHandler = e => {
        let specializationList = props.university.programs.find(
            element => element.courseName == e.target.value
        ).specialization;

        setApplicationForm({
            ...applicationForm,
            programName: e.target.value,
        });

        setSpecializations(specializationList);
    };

    // add file to state
    const onFileChange = e => {
        var changedFile;
        if (e.target.files.length == 0) {
            changedFile = {
                preview: "",
                data: "",
            };
        } else {
            changedFile = {
                preview: URL.createObjectURL(e.target.files[0]),
                data: e.target.files[0],
            };
        }
        switch (e.target.name) {
            case "sop":
                setsop(changedFile);
                break;

            case "lor1":
                setlor1(changedFile);
                break;

            case "lor2":
                setlor2(changedFile);
                break;

            case "lor3":
                setlor3(changedFile);
                break;

            case "resume":
                setresume(changedFile);
                break;

            default:
                break;
        }
    };

    return (
        <div className="application-container">
            <Form encType="multipart/form-data">
                <Form.Label>
                    <h3>Personal Information</h3>
                </Form.Label>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        name="createdBy"
                        onChange={e => onChangeHandler(e)}
                        type="text"
                        placeholder="Enter full name as per your passport"
                        defaultValue={applicationForm.createdBy}
                        disabled
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="createdByEmail"
                        type="email"
                        onChange={e => onChangeHandler(e)}
                        placeholder="Enter your personal email"
                        defaultValue={applicationForm.createdByEmail}
                        disabled
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Select
                        name="gender"
                        onChange={e => onChangeHandler(e)}
                        defaultValue={applicationForm.gender}
                        disabled
                    >
                        <option value={props.auth.user.gender}>
                            {props.auth.user.gender}
                        </option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        name="dateOfBirth"
                        onChange={e => onChangeHandler(e)}
                        type="text"
                        defaultValue={props.auth.user.dateOfBirth}
                        disabled
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        name="phone"
                        type="text"
                        defaultValue={props.auth.user.phone}
                        disabled
                    />
                </Form.Group>

                <Form.Label>
                    <h3>University Information</h3>
                </Form.Label>

                <Form.Group className="mb-3">
                    <Form.Label>Applying to</Form.Label>
                    <Form.Control
                        name="applyingTo"
                        type="text"
                        onChange={e => onChangeHandler(e)}
                        defaultValue={props.university.name}
                        disabled
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Semester Intake</Form.Label>
                    <Form.Select
                        name="semIntake"
                        onChange={e => onChangeHandler(e)}
                        required
                    >
                        <option>Select from the list of Intakes</option>
                        <option value="spring 2023">Spring 2023</option>
                        <option value="fall 2023">Fall 2023</option>
                        <option value="spring 2024">Spring 2024</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select your program</Form.Label>
                    <Form.Select
                        name="programName"
                        onChange={e => selectProgramHandler(e)}
                        required
                    >
                        <option>Select from the list of programs</option>
                        {props.university.programs.map(program => (
                            <option
                                selected={
                                    applicationForm.programName == program.courseName
                                }
                                value={program.courseName}
                            >
                                {program.courseName}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select your specialization</Form.Label>
                    <Form.Select
                        name="specialization"
                        onChange={e => onChangeHandler(e)}
                        required
                    >
                        {specializations.map(sp => (
                            <option selected={sp == applicationForm.specialization}>
                                {sp}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Label>
                    <h3>Documents</h3>
                </Form.Label>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Statement Of Purpose</Form.Label>
                    <Form.Control
                        name="sop"
                        onChange={e => onFileChange(e)}
                        type="file"
                    />{" "}
                    {applicationForm.sop != null ? (
                        <Form.Text className="text-muted">
                            This document has already been submitted, however, you may
                            submit an updated document before finally submitting the
                            application.
                        </Form.Text>
                    ) : null}
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Letter Of Recommendation 1</Form.Label>
                    <Form.Control
                        name="lor1"
                        onChange={e => onFileChange(e)}
                        type="file"
                    />{" "}
                    {applicationForm.lor1 != null ? (
                        <Form.Text className="text-muted">
                            This document has already been submitted, however, you may
                            submit an updated document before finally submitting the
                            application.
                        </Form.Text>
                    ) : null}
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Letter Of Recommendation 2</Form.Label>
                    <Form.Control
                        name="lor2"
                        onChange={e => onFileChange(e)}
                        type="file"
                    />{" "}
                    {applicationForm.lor2 != null ? (
                        <Form.Text className="text-muted">
                            This document has already been submitted, however, you may
                            submit an updated document before finally submitting the
                            application.
                        </Form.Text>
                    ) : null}
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Letter Of Recommendation 3</Form.Label>
                    <Form.Control
                        name="lor3"
                        onChange={e => onFileChange(e)}
                        type="file"
                    />{" "}
                    {applicationForm.lor3 != null ? (
                        <Form.Text className="text-muted">
                            This document has already been submitted, however, you may
                            submit an updated document before finally submitting the
                            application.
                        </Form.Text>
                    ) : null}
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Resume</Form.Label>
                    <Form.Control
                        name="resume"
                        onChange={e => onFileChange(e)}
                        type="file"
                    />{" "}
                    {applicationForm.resume != null ? (
                        <Form.Text className="text-muted">
                            This document has already been submitted, however, you may
                            submit an updated document before finally submitting the
                            application.
                        </Form.Text>
                    ) : null}
                </Form.Group>

                <Row>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            value="saved"
                            onClick={e => onSubmitHandler(e, "saved")}
                        >
                            Save
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            value="submitted"
                            onClick={e => onSubmitHandler(e, "submitted")}
                        >
                            Submit
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            type="submit"
                            value="withdraw"
                            onClick={e => onwWithdrawApplication(e)}>
                            Withdraw Application
                        </Button>
                    </Col>
                    
                </Row>
            </Form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer,
        application: state.applicationReducer,
        university: state.universityReducer,
    };
};

const mapDispatchToProps = {
    applicationFormSave,
    getApplication,
    withdrawApplication,
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
