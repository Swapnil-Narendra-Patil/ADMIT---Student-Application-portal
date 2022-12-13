import React from "react";
import { connect } from "react-redux";
import { startUniversityLoad } from "../../actions/universities";
import { useNavigate } from "react-router-dom";
import ApplicationSection from "./ApplicationSection.js";
import UniversitySection from "./TopUniversitySection.js";
import ShortlistSection from "./ShortlistSection.js";
import { Button } from "react-bootstrap";
import { getApplication } from "../../actions/application";
import { loadUser } from "../../actions/auth";

import Container from 'react-bootstrap/Container';
function Dashboard(props) {
  const navigate = useNavigate();

  if (props.auth.loading) {
    return <h1>Loading</h1>;
  }
  const onClickHandler = async () => {
    await props.startUniversityLoad("638c043031111c396dc2bad7");
    navigate("/university");
  };

  const onClickApplicationHandler = async () => {
    await props.loadUser();
    await props.getApplication("638cf137f6096b0f8bd91319");
    navigate("/application");
  }


  return (
    <>
      <div className="img-container-sea">
          <img src={require("./searock.jpeg")} className="img_style2" />
      </div>
      <div className="bg-img-name" >
        <h2>Welcome, {props.auth.user.name}</h2>
        <h3>Get started with your study abroad journey by editing your profile here - <Button variant="success" onClick={() => navigate("/edit-profile")}> &nbsp;Edit Profile </Button> </h3>
      </div>
    <Container>

      <ApplicationSection />
      <br></br>
      <ShortlistSection/>
      <br></br>
      <UniversitySection />

    </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, { startUniversityLoad, getApplication, loadUser })(Dashboard);
