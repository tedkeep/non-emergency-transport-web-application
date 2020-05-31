import {
  LOADING_PATIENTS,
  GET_PATIENTS,
  VIEW_PATIENT,
  EDIT_PATIENT,
  DELETE_PATIENT,
  ADD_PATIENT
} from "../actions/actionTypes";

const initialState = {
  patients: [],
  patient: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PATIENTS:
      return {
        ...state,
        loading: true
      };
    case EDIT_PATIENT:
    case GET_PATIENTS:
    case ADD_PATIENT:
    case DELETE_PATIENT:
      return {
        ...state,
        patients: action.payload,
        loading: false
      };
    case VIEW_PATIENT:
      return {
        ...state,
        patient: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
