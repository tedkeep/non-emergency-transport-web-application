import {
  LOADING_TRIP,
  GET_TRIPS,
  VIEW_TRIP,
  EDIT_TRIP,
  DELETE_TRIP,
  ADD_TRIP
} from "../actions/actionTypes";

const initialState = {
  trips: [],
  trip: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_TRIP:
      return {
        ...state,
        loading: true
      };
    case EDIT_TRIP:
    case GET_TRIPS:
    case ADD_TRIP:
    case DELETE_TRIP:
      return {
        ...state,
        trips: action.payload,
        loading: false
      };
    case VIEW_TRIP:
      return {
        ...state,
        trip: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
