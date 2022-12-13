import logo from "./logo.svg";
import "./styles/main.scss";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard";
import { loadUser } from "./actions/auth";
import { useEffect } from "react";
import { setAuthToken } from "./utils";
import PrivateRoute from "./components/PrivateRoute";
import Registration from "./components/Registration";
import University from "./components/University";
import Application from "./components/Application";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import AlertComponent from "./components/Alert";
import EditProfile from "./components/EditProfile";
import ApplicationDisplay from "./components/ApplicationDisplay";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Navbar />
      <AlertComponent />
     
      <BrowserRouter>
        <Routes>
        
          <Route exact path="/" element={<Landing />} />
          <Route
            exact
            path="/login"
            element={<Login token={localStorage.getItem("token")} />}
          />
          <Route exact path="/register" element={<Registration />} />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/university"
            element={
              <PrivateRoute>
                <University />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/application"
            element={
              <PrivateRoute>
                <Application />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/display-application"
            element={
              <PrivateRoute>
                <ApplicationDisplay />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Provider>
  );
}

export default App;
