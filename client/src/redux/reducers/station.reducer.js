import {
  LOADING_STATION,
  ADD_STATION,
  GET_ALL_STATIONS,
  DELETE_STATION
} from "../actions/actionTypes";

const initialState = {
  stations: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_STATION:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_STATIONS:
    case ADD_STATION:
    case DELETE_STATION:
      return {
        ...state,
        stations: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
