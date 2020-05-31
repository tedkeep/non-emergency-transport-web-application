import {
  LOADING_PERSONNEL,
  GET_PERSONNEL,
  VIEW_PERSONNEL,
  EDIT_PERSONNEL,
  DELETE_PERSONNEL,
  ADD_PERSONNEL
} from "../actions/actionTypes";

const initialState = {
  personnel: [],
  person: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PERSONNEL:
      return {
        ...state,
        loading: true
      };
    case EDIT_PERSONNEL:
    case GET_PERSONNEL:
    case ADD_PERSONNEL:
    case DELETE_PERSONNEL:
      return {
        ...state,
        personnel: action.payload,
        loading: false
      };
    case VIEW_PERSONNEL:
      return {
        ...state,
        person: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
