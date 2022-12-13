import { applyPatches } from "immer";
import { useEffect, useState } from "react";
import { useGetApplicationsByStudentIdQuery } from "../../api/applicationApi";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { connect, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getApplication } from "../../actions/application";
import { loadUser } from "../../actions/auth";

const AppplicationStatus = ["Pending", "In Review", "Accepted", "Rejected"];
const colorVariant = ["#ffff81", "#ffd078", "#a7ffa7", "#f89c9c"];

function ApplicationCard({ Application, getApplication, loadUser }) {
    const bgColor =
        colorVariant[AppplicationStatus.indexOf(Application.applicationStatus)];

    const navigate = useNavigate();

    const navigateToEditApplicationForm = async () => {
        await loadUser();
        await getApplication(Application._id);
        navigate("/application");
    };

    const navigateToDisplayApplication = async () => {
        await loadUser();
        await getApplication(Application._id);
        navigate("/display-application");
    };
    return (
        <div>
            <Card
                style={{
                    width: "18rem",
                    margin: "10px 5px",
                }}
                className="mb-2"
            >
                <Card.Header>
                    <strong>{Application.applyingTo}</strong>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Sem Intake:</strong>
                        {Application.semIntake}
                    </Card.Text>
                    <Card.Text>
                        <strong>Program:</strong>
                        {Application.programName}
                    </Card.Text>
                </Card.Body>
                <Card.Footer
                    style={{
                        backgroundColor: bgColor,
                    }}
                >
                    {Application.applicationStatus}
                </Card.Footer>
                {Application.status == "saved" ? (
                    <Button
                        variant="primary"
                        onClick={() => navigateToEditApplicationForm()}
                    >
                        Continue your application
                    </Button>
                ) : (
                    <Button
                        variant="success"
                        onClick={() => navigateToDisplayApplication()}
                    >
                        View your application
                    </Button>
                )}
            </Card>
        </div>
    );
}

function ApplicationSelector({ statusFilter, setStatusFilter }) {
    // refresh Section when statusFilter changes
    useEffect(() => {}, [statusFilter]);
    function handleSelect(e) {
        setStatusFilter(e);
    }

    const AllItem = (
        <Dropdown.Item key="All" eventKey="All">
            All
        </Dropdown.Item>
    );
    var selectorContent = AppplicationStatus.map(status => (
        <Dropdown.Item key={status} eventKey={status}>
            {status}
        </Dropdown.Item>
    ));

    return (
        <div>
            {/* <p>Filter Applications:</p> */}
            <DropdownButton
                id="dropdown-basic-button"
                onSelect={handleSelect}
                title={statusFilter}
            >
                <Dropdown.Menu>
                    {AllItem}
                    {selectorContent}
                </Dropdown.Menu>
            </DropdownButton>
        </div>
    );
}

function ApplicationSection(props) {
    // get studentId from auth
    const auth = useSelector(state => state.authReducer);
    const studentId = auth.user._id;
    const {
        data: Applications,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetApplicationsByStudentIdQuery(studentId);
    // useGetApplicationsByStudentIdQuery("6382996e0b0d5cc4eccec77c"); var
    // statusFilter = "all";
    const [statusFilter, setStatusFilter] = useState("All");

    var items = [];
    // refresh Section when statusFilter changes
    useEffect(() => {}, [statusFilter]);
    if (isLoading) {
        items = <p>Loading...</p>;
    } else if (isSuccess) {
        var displayApplications = [];
        if (AppplicationStatus.includes(statusFilter)) {
            displayApplications = Applications.filter(
                Application => Application.applicationStatus === statusFilter
            );
        } else {
            displayApplications = Applications;
        }
        // if length is 0, show no application
        if (displayApplications.length === 0) {
            if (statusFilter === "All") {
                items = <p>No Applications saved or submitted</p>;
            } else {
                items = <p>No Applications with status "{statusFilter}"</p>;
            }
        } else {
            items = displayApplications.map(Application => (
                <ApplicationCard
                    key={Application._id}
                    Application={Application}
                    getApplication={props.getApplication}
                    loadUser={props.loadUser}
                />
            ));
        }
    } else if (isError) {
        items = <p>Loading</p>;
    }

    return (
        <div
            style={{
                overflowY: "auto",
            }}
        >
            <h2>Applications</h2>

            <ApplicationSelector
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <div className="dashboardTile">
                <ul
                    style={{
                        display: "flex",
                        flexFlow: "row",
                    }}
                    className="cardsList"
                >
                    {items}
                </ul>
            </div>
        </div>
    );
}

export default connect(null, { getApplication, loadUser })(ApplicationSection);
