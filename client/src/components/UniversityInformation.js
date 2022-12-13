import React from 'react';
import { Form } from 'react-bootstrap';

//Display university related information of the application
export default function UniversityInformation(props) {
    const universityFields = props.universityFields;
    const fields = ["applyingTo", "semIntake", "programName", "specialization"]
  return (
    <div>
        {fields.map(field => {
                return (
                    <Form.Group className="mb-3">
                        {console.log(universityFields[field]) }
                        <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                        <Form.Control name={field} type="text" value={universityFields[field]} disabled/>
                    </Form.Group>
                )
            })}
    </div>
  );
}
