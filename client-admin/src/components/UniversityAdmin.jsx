import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import {
    useGetApplicationsByUniIdQuery,
    useUpdateApplicationMutation,
} from "../redux/api/applicationApi.js";

function ApplicationCard({ Application }) {
    const [updateAppn] = useUpdateApplicationMutation();
    async function onAccept() {
        updateAppn({ ...Application, applicationStatus: "Accepted" });
    }

    async function onReject() {
        var Appn =updateAppn({ ...Application, applicationStatus: "Rejected" });
    }
    const AppCard = (
        <Card bg="Primary">
            <Card.Body className="ApplicationBody">
                <Col>
                    <div>
                        <Card.Title className="heading"> Application 1 </Card.Title>
                        <Card.Text> Name: {Application.createdBy} </Card.Text>
                        <Card.Text> Email: {Application.createdByEmail}</Card.Text>
                        <Card.Text> University: {Application.applyingTo} </Card.Text>
                        <Card.Text> Course: {Application.programName} </Card.Text>
                    </div>
                </Col>
                <Col>
                    <div className="buttons">
                        <Button variant="primary" onClick={onAccept}>
                            Accept
                        </Button>
                        <Button variant="primary" onClick={onReject}>
                            Reject
                        </Button>
                    </div>
                </Col>
            </Card.Body>
        </Card>
    );
    return AppCard;
}

export default function UniversityAdmin(props) {
    const {
        data: Applications,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetApplicationsByUniIdQuery("638c043031111c396dc2bad7");
    // var Applications = [
    //   {
    //     _id: "638c375608b9cd60df607692",
    //     studentId: "638adfbfc01b86905e2ae7a8",
    //     createdBy: "Aditya Ramesh",
    //     createdByEmail: "adityamysore002@gmail.com",
    //     gender: "male",
    //     applicationStatus: "Pending",
    //     status: "saved",
    //     applyingTo: "Northeastern university",
    //     universityId: "638c043031111c396dc2bad7",
    //     programName: "Computer Science",
    //     semIntake: "fall 2023",
    //     education: [],
    //     __v: 0,
    //     lor1: "/Users/aditya/Documents/Northeastern/Web/project/final-project-byte-me/backend/uploads/applications/638c375608b9cd60df607692/lor1",
    //     lor2: "/Users/aditya/Documents/Northeastern/Web/project/final-project-byte-me/backend/uploads/applications/638c375608b9cd60df607692/lor2",
    //     lor3: "/Users/aditya/Documents/Northeastern/Web/project/final-project-byte-me/backend/uploads/applications/638c375608b9cd60df607692/lor3",
    //     resume:
    //       "/Users/aditya/Documents/Northeastern/Web/project/final-project-byte-me/backend/uploads/applications/638c375608b9cd60df607692/resume",
    //     sop: "/Users/aditya/Documents/Northeastern/Web/project/final-project-byte-me/backend/uploads/applications/638c375608b9cd60df607692/sop",
    //     specialization: "Software Engineering",
    //   },
    //   {
    //     _id: "638c4f07f4ffd91d202a5bd5",
    //     studentId: "638adfbfc01b86905e2ae7a8",
    //     createdBy: "Aditya Ramesh",
    //     createdByEmail: "adityamysore002@gmail.com",
    //     gender: "male",
    //     applicationStatus: "Pending",
    //     status: "saved",
    //     applyingTo: "Northeastern university",
    //     universityId: "638c043031111c396dc2bad7",
    //     programName: "Data Science",
    //     semIntake: "spring 2024",
    //     education: [],
    //     __v: 0,
    //     sop: "/Users/aditya/Documents/Northeastern/Web/project/final-project-byte-me/backend/uploads/applications/638c4f07f4ffd91d202a5bd5/sop",
    //     specialization: "Reinforcement learning",
    //   },
    //   {
    //     _id: "638cf0a5f6096b0f8bd9130c",
    //     studentId: "638adfbfc01b86905e2ae7a8",
    //     createdBy: "Aditya",
    //     createdByEmail: "adityamysore002@gmail.com",
    //     gender: "male",
    //     applicationStatus: "In Review",
    //     status: "submitted",
    //     applyingTo: "Northeastern university",
    //     universityId: "638c043031111c396dc2bad7",
    //     programName: "Data Science",
    //     semIntake: "fall 2023",
    //     education: [],
    //     __v: 0,
    //     specialization: "Reinforcement learning",
    //   },

    //   {
    //     _id: "638cf0a5f6096b0f8bd9131c",
    //     studentId: "638adfbfc01b86905e2ae7a8",
    //     createdBy: "Aditya",
    //     createdByEmail: "adityamysore002@gmail.com",
    //     gender: "male",
    //     applicationStatus: "In Review",
    //     status: "submitted",
    //     applyingTo: "Northeastern university",
    //     universityId: "638c043031111c396dc2bad7",
    //     programName: "Data Science",
    //     semIntake: "fall 2023",
    //     education: [],
    //     __v: 0,
    //     specialization: "Reinforcement learning",
    //   },
    // ];
    var items = "";
    if (isLoading) {
        items = <div>Loading...</div>;
    }
    if (isError) {
        items = <div>Error: {error.message}</div>;
    }
    if (isSuccess) {
        items = Applications.map(Application => (
            <ApplicationCard key={Application._id} Application={Application} />
        ));
    }

    return <Container>{items}</Container>;
}
