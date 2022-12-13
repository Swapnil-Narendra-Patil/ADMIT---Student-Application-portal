import React from 'react';
import {Modal, Button, Form, ListGroup} from "react-bootstrap";

export default function ProgramDetails(props) {
// Open a modal to show the program information and its specializations
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.currentProgram.courseName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Credits :
                </Form.Label>
                <Form.Label>{props.currentProgram.credits}</Form.Label>
                <br></br>
                <Form.Label>Specializations :
                </Form.Label>
                <br></br>
                <ListGroup>
                    {props.currentProgram.specialization
                        ? props
                            .currentProgram
                            .specialization
                            .map(sp => <ListGroup.Item>{sp}</ListGroup.Item>) : null}
                </ListGroup>
                <br></br>
                <Form.Label>Description :   </Form.Label>
                <Form.Label>{props.currentProgram.description}</Form.Label>
            </Modal.Body>
        </Modal>
    );
}
