import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import journals from './journals';

export default combineReducers({ alert, auth, journals });
