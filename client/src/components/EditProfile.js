import React, {useEffect, useState, ReactDOM} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import {updateProfile} from '../actions/auth';
import Education from './Education';
import Experience from './Experience';

//Here you can edit existing education, experience and add new ones
function EditProfile(props) {

    const navigate = useNavigate();

    const [editProfile,
        setEditProfile] = useState({
        name: props.auth.user.name,
        gender: props.auth.user.gender,
        email: props.auth.user.email,
        phone: props.auth.user.phone,
        education: [...props.auth.user.education],
        experience: [...props.auth.user.experience],
        greScore: props.auth.user.greScore,
        toeflScore: props.auth.user.toeflScore,
        ieltsScore: props.auth.user.ieltsScore
    })

    const [education,
        setEducation] = useState({university: "", degree: "", gpa: 0.0, specialization: ""});

    const [experience,
        setExperience] = useState({
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        currentWorkFlag: false,
        description: ""
    })

    const [showEducationForm,
        setShowEducationForm] = useState(false);

    const [showExperienceForm,
        setShowExperienceForm] = useState(false);

    const [showAddEducationButton,
        setShowAddEducationButton] = useState(true)

    const [showAddExperienceButton,
        setShowAddExperienceButton] = useState(true)

    const onChangeHandler = (e) => {
        setEditProfile((editProfile) => {
            return ({
                ...editProfile,
                [e.target.name]: e.target.value
            })
        })
    }

    const onEducationChangeHandler = (e) => {
        setEducation((education) => {
            return ({
                ...education,
                [e.target.name]: e.target.value
            })
        })
    }

    const onExperienceChangeHandler = (e) => {
        setExperience((experience) => {
            return ({
                ...experience,
                [e.target.name]: e.target.value
            })
        })
    }

    const getDateFromDateTimeObj = (str) => {
        return str != null
            ? str.split("T")[0]
            : null;
    }

    const addEducationToState = (e) => {
        e.preventDefault();
        setEditProfile({
            ...editProfile,
            education: [
                ...editProfile.education,
                education
            ]
        });
        setShowEducationForm(false);
        setShowAddEducationButton(true);
        setEducation({university: "", degree: "", gpa: 0.0, specialization: ""});
    }

    const addExperienceToState = (e) => {
        e.preventDefault();
        setEditProfile({
            ...editProfile,
            experience: [
                ...editProfile.experience,
                experience
            ]
        });
        setShowExperienceForm(false);
        setShowAddExperienceButton(true);
        setExperience({
            companyName: "",
            jobTitle: "",
            startDate: "",
            endDate: "",
            currentWorkFlag: false,
            description: ""
        });
    }

    const editExistingEducation = (e, id) => {
        var educationObjIndex = editProfile
            .education
            .findIndex(ed => ed._id == id);
        var educationObj = Object.assign({}, editProfile.education[educationObjIndex]);

        educationObj[e.target.name] = e.target.value;

        var educationList = Object.assign([], editProfile.education);
        educationList = educationList.filter(ex => ex._id != id);
        educationList.push(educationObj)
        setEditProfile((currentEditProf) => {
            return {
                ...currentEditProf,
                education: [...educationList]
            }
        })
    }

    const editExistingExperience = (e, id) => {

        var experienceObjIndex = editProfile
            .experience
            .findIndex(ex => ex._id == id);
        var experienceObj = Object.assign({}, editProfile.experience[experienceObjIndex]);
        
        if(e.target.name == "currentWorkFlag"){
            experienceObj["currentWorkFlag"] = e.target.checked;
            if(e.target.checked){
                experienceObj["endDate"] = "";
            }
        }
        else{
            experienceObj[e.target.name] = e.target.value;
        }

        var experienceList = Object.assign([], editProfile.experience);
        experienceList = experienceList.filter(ex => ex._id != id);
        experienceList.push(experienceObj)
        setEditProfile((currentEditProf) => {
            return {
                ...currentEditProf,
                experience: [...experienceList]
            }
        })
    }

    const openEducationForm = () => {
        setShowEducationForm(true);
        setShowAddEducationButton(false);
    }

    const removeEducationForm = () => {
        setShowAddEducationButton(true);
        setShowEducationForm(false);
        setEducation({university: "", degree: "", gpa: 0.0, specialization: ""});
    }

    const openExperienceForm = () => {
        setShowAddExperienceButton(false);
        setShowExperienceForm(true);
    }

    const removeExperienceForm = () => {
        setShowAddExperienceButton(true);
        setShowExperienceForm(false);
    }

    const finalSaveProfile = async(e) => {
        e.preventDefault();
        await props.updateProfile(props.auth.user._id, editProfile);
        navigate("/dashboard");
    }

    return (
        <div className='application-container'>
            <Form>
                <Form.Label>
                    <h3>Personal Information</h3>
                </Form.Label>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        name='name'
                        onChange={e => onChangeHandler(e)}
                        type="text"
                        defaultValue={props.auth.user.name}
                        required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name='email'
                        onChange={e => onChangeHandler(e)}
                        type="text"
                        defaultValue={props.auth.user.email}
                        required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        name='phone'
                        onChange={e => onChangeHandler(e)}
                        type="text"
                        placeholder="Enter a valid phone number"
                        defaultValue={props.auth.user.phone}
                        required/>
                </Form.Group>
                <br></br>
                <Form.Label>
                    <h3>Education</h3>
                </Form.Label>

                {/* //Edit existing education*/}

                <ol>
                    {editProfile.education.length > 0
                        ? editProfile
                            .education
                            .map(ed => {
                                return (
                                    <li>
                                        <Form.Group className="mb-3">
                                            <Form.Label>University</Form.Label>
                                            <Form.Control
                                                name='university'
                                                type="text"
                                                defaultValue={ed.university}
                                                placeholder="University name"
                                                onChange={e => editExistingEducation(e, ed._id)}/>
                                            <br></br>
                                            <Form.Label>Degree</Form.Label>
                                            <Form.Control
                                                name='degree'
                                                type="text"
                                                placeholder="Degree name"
                                                defaultValue={ed.degree}
                                                onChange={e => editExistingEducation(e, ed._id)}/>
                                            <br></br>
                                            <Form.Label>GPA</Form.Label>
                                            <Form.Control
                                                name='gpa'
                                                type="text"
                                                placeholder="GPA"
                                                defaultValue={ed.gpa}
                                                onChange={e => editExistingEducation(e, ed._id)}/>
                                            <br></br>
                                            <Form.Label>Specialization</Form.Label>
                                            <Form.Control
                                                name='specialization'
                                                type="text"
                                                placeholder="Specialization"
                                                defaultValue={ed.specialization}
                                                onChange={e => editExistingEducation(e, ed._id)}/>
                                            <br></br>
                                        </Form.Group>
                                    </li>
                                )
                            })
                        : null
}
                </ol>

                {showAddEducationButton
                    ? <Button variant='success' onClick={() => openEducationForm()}>Add education</Button>
                    : null
}
{/* Open a form to add a new education  */}
                {showEducationForm
                    ? <Form.Group className="mb-3">
                            <Form.Label>
                                <h5>
                                    Add education here
                                </h5>
                            </Form.Label>
                            <br/>
                            <Form.Label>University</Form.Label>
                            <Form.Control
                                name='university'
                                onChange={e => onEducationChangeHandler(e)}
                                type="text"
                                placeholder="University name"/>
                            <br></br>
                            <Form.Label>Degree</Form.Label>
                            <Form.Control
                                name='degree'
                                onChange={e => onEducationChangeHandler(e)}
                                type="text"
                                placeholder="Degree name"/>
                            <br></br>
                            <Form.Label>GPA</Form.Label>
                            <Form.Control
                                name='gpa'
                                onChange={e => onEducationChangeHandler(e)}
                                type="text"
                                placeholder="GPA"/>
                            <br></br>
                            <Form.Label>Specialization</Form.Label>
                            <Form.Control
                                name='specialization'
                                onChange={e => onEducationChangeHandler(e)}
                                type="text"
                                placeholder="Specialization"/>
                            <br></br>
                            <Row>
                                <Col>
                                    <Button type='submit' variant='success' onClick={(e) => addEducationToState(e)}>Add</Button>
                                    <Button variant='danger' onClick={() => removeEducationForm()}>Cancel</Button>
                                </Col>
                            </Row>

                        </Form.Group>
                    : null}



                <br></br>
                <br></br>
                <Form.Label>
                    <h3>Experience</h3>
                </Form.Label>
{/* Edit existing experience */}
                <ol>
                    {editProfile.experience.length > 0
                        ? editProfile
                            .experience
                            .map(ex => {
                                return (
                                    <li>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Company</Form.Label>
                                            <Form.Control
                                                name='companyName'
                                                type="text"
                                                defaultValue={ex.companyName}
                                                onChange={e => editExistingExperience(e, ex._id)}/>
                                            <br></br>
                                            <Form.Label>Job Title</Form.Label>
                                            <Form.Control
                                                name='jobTitle'
                                                type="text"
                                                defaultValue={ex.jobTitle}
                                                onChange={e => editExistingExperience(e, ex._id)}/>
                                            <br></br>
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                name='startDate'
                                                type="date"
                                                value={getDateFromDateTimeObj(ex.startDate)}
                                                onChange={e => editExistingExperience(e, ex._id)}/>
                                            <br></br>
                                            <Form.Check
                                                name="currentWorkFlag"
                                                type="checkbox"
                                                id="default-checbox"
                                                checked={ex.currentWorkFlag}
                                                label="Currently working in this company"
                                                onChange={e => editExistingExperience(e, ex._id)}
                                                />
                                            <br></br>
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
                                                name='endDate'
                                                type="date"
                                                value={ex.endDate != "" ? getDateFromDateTimeObj(ex.endDate) : ""}
                                                onChange={e => editExistingExperience(e, ex._id)}
                                                disabled={ex.currentWorkFlag}/>
                                            <br></br>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                name='description'
                                                type="text"
                                                defaultValue={ex.description}
                                                onChange={e => editExistingExperience(e, ex._id)}/>
                                            <br></br>
                                        </Form.Group>
                                    </li>
                                )
                            })
                        : null
}
                </ol>
{/* Add experience button  */}
                {showAddExperienceButton
                    ? <Button variant='success' onClick={() => openExperienceForm()}>Add experience</Button>
                    : null
}
{/* Add new experience */}
                {showExperienceForm
                    ? <Form.Group className="mb-3">
                            <Form.Label>
                                <h5>
                                    Add experience here
                                </h5>
                            </Form.Label>
                            <br/>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                name='companyName'
                                onChange={e => onExperienceChangeHandler(e)}
                                type="text"/>
                            <br></br>
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                name='jobTitle'
                                onChange={e => onExperienceChangeHandler(e)}
                                type="text"/>
                            <br></br>
                            <Form.Label>Start date</Form.Label>
                            <Form.Control
                                name='startDate'
                                onChange={e => onExperienceChangeHandler(e)}
                                type="date"/>
                            <br></br>
                            <Form.Check
                                type="checkbox"
                                id="default-checbox"
                                onChange={(e) => setExperience({
                                ...experience,
                                currentWorkFlag: e.target.checked
                            })}
                                label="Currently working in this company"/>
                            <br></br>
                            <Form.Label>End date</Form.Label>
                            <Form.Control
                                name='endDate'
                                onChange={e => onExperienceChangeHandler(e)}
                                type="date"
                                disabled={experience.currentWorkFlag}/>
                            <br></br>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name='description'
                                onChange={e => onExperienceChangeHandler(e)}
                                type="text"/>
                            <br></br>
                            <Row>
                                <Col>
                                    <Button
                                        type='submit'
                                        variant='success'
                                        onClick={(e) => addExperienceToState(e)}>Add</Button>
                                    <Button variant='danger' onClick={() => removeExperienceForm()}>Cancel</Button>
                                </Col>
                            </Row>

                        </Form.Group>
                    : null}

                <br></br>
                <br></br>
                <Row>
                    <Col>
                        <Button type='submit' variant='success' onClick={(e) => finalSaveProfile(e)}>Save Profile</Button>
                    </Col>
                </Row>

            </Form>
        </div>
    );
}

const mapStateToProps = state => {
    return {auth: state.authReducer}
}
export default connect(mapStateToProps, {updateProfile})(EditProfile);