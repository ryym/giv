import { combineReducers } from 'redux';
import { updateUserConfig } from './userConfig';

export default function createStateReducer() {
  return combineReducers({
    userConfig: updateUserConfig,
  });
}
