import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './usersReducer';

export default combineReducers({
  users: usersReducer
}); 