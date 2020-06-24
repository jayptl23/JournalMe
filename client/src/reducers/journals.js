import {
  GET_JOURNALS,
  GET_JOURNAL,
  JOURNALS_ERROR,
  CLEAR_JOURNALS,
  ADD_JOURNAL,
  DELETE_JOURNAL,
  GET_NOTE,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
} from '../actions/types';

const initialState = {
  journals: [],
  journal: null,
  note: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOURNALS:
      return {
        ...state,
        journals: payload,
        loading: false,
        journal: null,
        note: null,
      };
    case ADD_JOURNAL:
      return {
        ...state,
        journals: [payload, ...state.journals],
        //loading: false,
      };
    case DELETE_JOURNAL:
      return {
        ...state,
        journals: state.journals.filter((journal) => journal._id !== payload),
      };
    case GET_NOTE:
      return { ...state, note: payload, loading: false };
    case GET_JOURNAL:
    case ADD_NOTE:
    case DELETE_NOTE:
      return { ...state, journal: payload, loading: false };
    case UPDATE_NOTE:
      return { ...state, note: payload /*loading: false*/ };
    case JOURNALS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_JOURNALS:
      return {
        ...state,
        journals: [],
        journal: null,
        loading: false,
      };
    default:
      return state;
  }
}
