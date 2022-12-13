import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import {getUniversityById} from '../actions/universities';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Carousel, Col, Container, Row} from "react-bootstrap";
import ProgramList from './ProgramList';
import { clearApplication } from '../actions/application';

function University(props) {

    const navigate = useNavigate();

    useEffect(() => {
         props.getUniversityById(props.university.id);
    }, []);

    //go to a new application on clicking apply now button
    const navigateToApplicationForm = () => {
        props.clearApplication();
        navigate("/application");
    }

    return (
        <Container fluid>
            <Row >
                <Col
                    md={{
                    span: 10,
                    offset: 1
                }}>
                    {/* Using carousel to display multiple images */}
                    <Carousel >
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src={props.university.imgURL1}
                                alt="First slide"
                                width="80px"
                                height="600px"/>
                            <Carousel.Caption>
                                <h3>{props.university.name != undefined
                                        ? props.university.name
                                        : null}</h3>
                                <p>{props.university.location != undefined
                                        ? props.university.location
                                        : null}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={props.university.imgURL2}
                                alt="Second slide"
                                width="80px"
                                height="600px"/>

                            <Carousel.Caption>
                                <h3>{props.university.name != undefined
                                        ? props.university.name
                                        : null}</h3>
                                <p>{props.university.location != undefined
                                        ? props.university.location
                                        : null}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={props.university.imgURL3}
                                alt="Third slide"
                                width="80px"
                                height="600px"/>

                            <Carousel.Caption>
                                <h3>{props.university.name != undefined
                                        ? props.university.name 
                                        : null}</h3>
                                <p>
                                    {props.university.location != undefined
                                        ? props.university.location
                                        : null}
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                </Col>
            </Row>
            <br/>
            <Row>
                <Col
                    md={{
                    span: 10,
                    offset: 1
                }}>
                    <p>{props.university.description != undefined
                            ? props.university.description
                            : null}</p>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col
                    md={{
                    span: 10,
                    offset: 1
                }}>
                    Our Programs:
                    <br></br>
                    {props.university.programs != undefined
                        ? <ProgramList programs={props.university.programs}/>
                        : null}
                </Col>
            </Row>
            <br></br>
            <Row>
                {/* TODO : OnClick handler here to navigate to application form comaponent */}
                <Col className='apply-button'>
                    <Button variant="primary" onClick={() => navigateToApplicationForm()}>Apply Now</Button>
                </Col>
            </Row>
        </Container>

    );
}
const mapStateToProps = state => {
    return {auth: state.authReducer, university: state.universityReducer}
}

const mapDispatchToProps = {
    getUniversityById,
    clearApplication
}

export default connect(mapStateToProps, mapDispatchToProps)(University);