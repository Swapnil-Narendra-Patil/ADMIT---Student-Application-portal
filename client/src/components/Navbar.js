import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../actions/auth";

function Navbar(props) {
  const onLogout = () => {
    props.logoutUser();
  };

  return (
    <>
      {props.auth.isAuthenticated ? (
        <>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossOrigin="anonymous"
          />
          {/* <link rel="stylesheet" href="./style.css" /> */}
         
         {/* Topnav is thew parent div for this page */}
         <div className="topnav">
            {" "}
            <div className="logo_styles">
              <a href="/">
                <img
                  src={require("../static/uniicon.ico")}
                  className="img_style"
                />
              </a>
              <p className="name_style">ADMIT</p>
            </div>{" "}
            {/* The form element includes just the search bar for users to search any university required */}
            <form className="search_bar_wrap">
              {" "}
              <input
                id="searchBar"
                className="searchbar"
                type="text"
                placeholder="Search..."
              />
              <a id="btnSearch" className="btn-search">
                <i className="fa fa-search"></i>
              </a>{" "}
            </form>
            <a onClick={() => onLogout()} className="logout-style">
              {/* Log oiut button with and onclick event which logs the uers iut and redirects him to the login page */}
              {" "}
              Log Out{" "}
            </a>
          </div>
        </>
      ) : (
        <div className="topnav">
          <div className="logo_styles">
            <a href="/">
              <img
                src={require("../static/uniicon.ico")}
                className="img_style"
              />
            </a>{" "}
            {/* Mentions the application name on the left of the navbar */}
            <p className="name_style">ADMIT</p>
          </div>
          <div className="log_out_nav">
            <a href="/login" className="login_style">
              Login
            </a>
            <a href="/register" className="login_style">
              {" "}
              SignUp{" "}
              {/* The sign up button which the new user can click to sign up */}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.authReducer };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
