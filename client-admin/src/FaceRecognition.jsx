import React from 'react';
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function FaceRecognition(props) {
    var faceio;
    useEffect(() => {
        faceio = new faceIO("fioade12");
    }, []);

    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");


    const navigate = useNavigate();


    const handleSignIn = async(e) => {

      console.log(email, pin);
      var faceio = new faceIO("fioade12");
      e.preventDefault();
        try {
            let response = await faceio.enroll({
                locale: "auto",
                payload: {
                    email: email,
                    pin: pin
                }
            });

            console.log(response);

        } catch (error) {
            console.log(error);
        }
    };

    const handleLogIn = async(e) => {
        e.preventDefault();
        var faceio = new faceIO("fioade12");
        try {
            let response = await faceio.authenticate({locale: "auto"});

            console.log(response);
            navigate("/university-admin");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <h1>University Admin</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        name='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        required/>
                </Form.Group>
                <br></br>
                <Form.Group className="mb-3">
                    <Form.Label>Pin</Form.Label>
                    <Form.Control
                        name='pin'
                        onChange={e => setPin(e.target.value)}
                        value={pin}
                        type="text"
                        required/>
                </Form.Group>
                <br></br>

                <button onClick={(e) => handleSignIn(e)} >Sign-in </button>
                <button onClick={(e) => handleLogIn(e)}>Log in</button>
            </Form>

        </div>
    );
}
