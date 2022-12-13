import React, {useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import ProgramDetails from './ProgramDetails';

//Display list of programs of a particular university
export default function ProgramList(props) {

    const [show, setShow] = useState(false);
    const [currentProgram, setCurrentProgram] = useState({
        courseName: "",
        credits: "",
        specializations: [],
        description: ""
    });

    const showDetails = (program) => {
        setCurrentProgram(program);
        setShow(true);
    }

    return (
        <>
            <ProgramDetails currentProgram={currentProgram} show={show} onHide={() => setShow(false)}/>
            <ListGroup as="ol" numbered >
                {props
                    .programs
                    .map(program => <ListGroup.Item onClick={() => showDetails(program)} as="li" >{program.courseName}</ListGroup.Item>)}

            </ListGroup>
        </>
    );
}
