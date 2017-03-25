import { combineReducers } from 'redux';
import { updateUserConfig } from './userConfig';
import updateEntities from './entities/reducer';
import updatePagination from './pagination/reducer';

export default function createStateReducer() {
  return combineReducers({
    userConfig: updateUserConfig,
    entities: updateEntities,
    pagination: updatePagination,
  });
}
