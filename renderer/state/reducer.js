import { combineReducers } from 'redux';
import { updateUserConfig } from './user-config';
import updateEntities from './entities/reducer';
import updatePagination from './pagination/reducer';
import updateUIState from './ui/reducer';

export default function createStateReducer() {
  return combineReducers({
    userConfig: updateUserConfig,
    entities: updateEntities,
    pagination: updatePagination,
    ui: updateUIState,
  });
}
