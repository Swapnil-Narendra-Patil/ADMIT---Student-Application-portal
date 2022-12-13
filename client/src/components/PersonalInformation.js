import React from 'react';
import {Form} from 'react-bootstrap';

export default function PersonalInformation(props) {

    const userInformation = props.userInformation;

    const fields = ["name", "email", "phone", "gender"];
    return (
        <div>
            <Form.Label>
                <h4>Personal Information</h4>
            </Form.Label>
            {fields.map(field => {
                return (
                    <Form.Group className="mb-3">
                        {console.log(userInformation[field]) }
                        <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                        <Form.Control name={field} type="text" value={userInformation[field]} disabled/>
                    </Form.Group>
                )
            })}
        </div>
    );
}
