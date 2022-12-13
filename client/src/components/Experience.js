import React from 'react';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';

//Display experience part of user
function Experience(props) {

    const getDateFromDateTimeObj = (str) => {
        return str != null ? str.split("T")[0] : null;
    }

    return (
        <ol>
            {props.experienceList.length > 0
                ? props
                    .experienceList
                    .map(ex => {
                        return (
                            <li>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control
                                        name='companyName'
                                        onChange={e => props.onChangeHandler(e)}
                                        type="text"
                                        defaultValue={ex.companyName}
                                        disabled/>
                                    <br></br>
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control name='jobTitle' type="text" defaultValue={ex.jobTitle} disabled/>
                                    <br></br>
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        name='startDate'
                                        type="text"
                                        value={getDateFromDateTimeObj(ex.startDate)}
                                        disabled/>
                                    <br></br>
                                    <Form.Check type="checkbox" id="default-checbox" checked={ex.currentWorkFlag} label="Currently working in this company" disabled/>
                                    <br></br>
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        name='endDate'
                                        type="text"
                                        value={getDateFromDateTimeObj(ex.endDate)}
                                        disabled/>
                                    <br></br>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        name='description'
                                        type="text"
                                        defaultValue={ex.description}
                                        disabled/>
                                    <br></br>
                                </Form.Group>
                            </li>
                        )
                    })
                : null
}
        </ol>
    );
}

const mapStateToProps = state => {
    return {auth: state.authReducer}
}

export default connect(mapStateToProps, null)(Experience);