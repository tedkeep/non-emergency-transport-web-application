import React, { Fragment, useEffect } from "react";
import SideNav from "./components/SideNav.component";
import { Route, useLocation, withRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PageTitle from "./components/PageTitle.component";
import TripRouter from "./components/trips/TripRouter.component";
import Login from "./components/auth/Login.component";
import PatientRouter from "./components/patient/PatientRouter.component";
import VehicleRouter from "./components/vehicle/VehicleRouter.component";
import Staff from "./components/personnel/Staff.component";
import ScheduleRouter from "./components/scheduling/ScheduleRouter.component";

import search from "./resources/images/search.svg";

import { connect } from "react-redux";
import { loadUser } from "./redux/actions/auth.actions";

const App = props => {
  let location = useLocation();

  useEffect(() => {
    props.dispatch(loadUser());
  }, []);

  const { isAuthenticated } = props;
  return (
    <div className="App">
      {isAuthenticated ? (
        <Fragment>
          <div className="sidenav">
            <SideNav />
          </div>
          <div className="main">
            {/* <div className="topBar">
              <PageTitle location={location} />
              <img className="search" src={search} alt="Search" />
            </div> */}
            <Route path="/schedules">
              <ScheduleRouter />
            </Route>
            <Route path="/patients">
              <PatientRouter />
            </Route>
            <Route path="/vehicles">
              <VehicleRouter />
            </Route>
            <Route path="/staff">
              <Staff />
            </Route>
            <Route path="/trips">
              <TripRouter />
            </Route>
          </div>
        </Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(App));
