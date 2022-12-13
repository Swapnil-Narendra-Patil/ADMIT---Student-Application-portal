import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { addEducation } from '../actions/auth';

function AddEducationForm(props) {

    const [educationForm,
        setEducationForm] = useState({university: "", degree: "", gpa: 0.0, specialization: ""});

    const onChangeHandler = (e) => {
        setEducationForm((educationForm) => {
            return ({
                ...educationForm,
                [e.target.name]: e.target.value
            })
        })
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        await props.addEducation(props.auth.user.id, educationForm);
    }

    return (
        <Form onSubmit={e => onSubmitHandler(e)}>
            <Form.Group className="mb-3">
                <Form.Label>
                    <h5>
                        Add education here
                    </h5>
                </Form.Label>
                <br/>
                <Form.Label>University</Form.Label>
                <Form.Control
                    name='university'
                    onChange={e => onChangeHandler(e)}
                    type="text"
                    placeholder="Enter full name as per your passport"/>
                <br></br>
                <Form.Label>Degree</Form.Label>
                <Form.Control
                    name='degree'
                    onChange={e => onChangeHandler(e)}
                    type="text"
                    placeholder="Enter full name as per your passport"/>
                <br></br>
                <Form.Label>GPA</Form.Label>
                <Form.Control
                    name='gpa'
                    onChange={e => onChangeHandler(e)}
                    type="text"
                    placeholder="Enter full name as per your passport"/>
                <br></br>
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                    name='specialization'
                    onChange={e => onChangeHandler(e)}
                    type="text"
                    placeholder="Enter full name as per your passport"/>
                <br></br>
                <Button type='submit' variant='success'>Add</Button>
            </Form.Group>
        </Form>
    );
}

const mapStateToProps = state => {
    return {auth: state.authReducer}
}
export default connect(mapStateToProps, {addEducation})(AddEducationForm);
