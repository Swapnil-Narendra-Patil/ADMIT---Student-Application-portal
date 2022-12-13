import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import PersonalInformation from './PersonalInformation';
import Education from './Education';
import Experience from './Experience';
import UniversityInformation from './UniversityInformation';
import { withdrawApplication } from '../actions/application';

function ApplicationDisplay(props) {

    const navigate = useNavigate();
// Handler to withdraw the application 
    const onwWithdrawApplication = async (e) => {
        e.preventDefault();
        await props.withdrawApplication(props.application._id);
        navigate("/dashboard");
    }

    const [userInformation,
        setuserInformation] = useState(props.auth.user);
    const [universityApplicationInformation,
        setuniversityApplicationInformation] = useState(props.application)
    return (
        <div className='application-container'>
            <Form.Label>
                <h4>Your Application Summary</h4>
            </Form.Label>
            <br></br>
            <PersonalInformation userInformation={userInformation}/>

            <br></br>
            <Form.Label>
                <h4>University Information</h4>
            </Form.Label>

            <UniversityInformation universityFields={universityApplicationInformation}/>

            <br></br>
            <Form.Label>
                <h4>Education</h4>
            </Form.Label>

            <Education educationList={userInformation.education}/>

            <br></br>
            <Form.Label>
                <h4>Experiences</h4>
            </Form.Label>

            <Experience experienceList={userInformation.experience}/>
            <Col>
                <Button
                    variant="danger"
                    type="submit"
                    value="withdraw"
                    onClick={e => onwWithdrawApplication(e)}>
                    Withdraw Application
                </Button>
            </Col>

        </div>
    );
}

const mapStateToProps = state => {
    return {auth: state.authReducer, application: state.applicationReducer}
}

export default connect(mapStateToProps, {withdrawApplication})(ApplicationDisplay);
