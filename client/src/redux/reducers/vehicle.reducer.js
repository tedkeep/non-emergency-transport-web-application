import {
  LOADING_VEHICLES,
  GET_VEHICLES,
  VIEW_VEHICLE,
  EDIT_VEHICLE,
  DELETE_VEHICLE,
  ADD_VEHICLE
} from "../actions/actionTypes";

const initialState = {
  vehicles: [],
  vehicle: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_VEHICLES:
      return {
        ...state,
        loading: true
      };
    case EDIT_VEHICLE:
    case GET_VEHICLES:
    case ADD_VEHICLE:
    case DELETE_VEHICLE:
      return {
        ...state,
        vehicles: action.payload,
        loading: false
      };
    case VIEW_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
