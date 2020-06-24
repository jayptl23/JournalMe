import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// Initial state is an array of objects
/* 
    {
        id: '1',
        msg: 'Please enter a name',
        alertType: 'error' // determines color
    }
*/
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
