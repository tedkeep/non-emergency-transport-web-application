import React, { useState } from "react";
import { Link } from "react-router-dom";

import profile from "../resources/images/profile.svg";
import schedule from "../resources/images/schedules.svg";
import trip from "../resources/images/trips.svg";
import patient from "../resources/images/patient.svg";
import vehicle from "../resources/images/vehicles.svg";
import staff from "../resources/images/staff.svg";
import logout from "../resources/images/logout.svg";
import settings from "../resources/images/settings.svg";

const SideNav = () => {
  const [settingsDropdown, setSettingsDropdown] = useState(false);

  const toggleSettingsDropdown = () => {
    setSettingsDropdown(!settingsDropdown);
  };

  return (
    <nav className="sideNav">
      <Link className="profile" to="/schedules">
        <img src={profile} />
      </Link>
      <Link className="link" to="/schedules">
        <img className="menuIcons" src={schedule} /> Schedules
      </Link>
      <Link className="link" to="/trips">
        <img className="menuIcons" src={trip} /> Trips
      </Link>
      <Link className="link" to="/patients">
        <img className="menuIcons" src={patient} /> Patients
      </Link>
      <Link className="link" to="/vehicles">
        <img className="menuIcons" src={vehicle} /> Vehicles
      </Link>
      <Link className="link" to="/staff">
        <img className="menuIcons" src={staff} /> Staff
      </Link>
      <Link className="link" onClick={toggleSettingsDropdown}>
        <img className="menuIcons" src={settings} /> Settings
      </Link>
      {settingsDropdown ? (
        <div className="dropdown">
          <Link className="link" to="/settings/skills">
            Skills
          </Link>
          <Link className="link" to="/settings/stations">
            Stations
          </Link>
        </div>
      ) : (
        ""
      )}
      <Link className="logout" to="/login">
        <img className="menuIcons" src={logout} /> Logout
      </Link>
    </nav>
  );
};

export default SideNav;
