import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import patientReducer from "./patient.reducer";
import vehicleReducer from "./vehicle.reducer";
import personnelReducer from "./personnel.reducer";
import tripReducer from "./trip.reducer";
import scheduleReducer from "./schedule.reducer";
import skillReducer from "./skill.reducer";
import stationReducer from "./station.reducer";

export default combineReducers({
  auth: authReducer,
  patient: patientReducer,
  vehicle: vehicleReducer,
  personnel: personnelReducer,
  trip: tripReducer,
  schedule: scheduleReducer,
  skill: skillReducer,
  station: stationReducer
});
