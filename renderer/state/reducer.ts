import { combineReducers, Reducer } from 'redux';
import { updateUserConfig, UserConfigState } from './user-config';
import updateEntities, { EntitiesState } from './entities/reducer';
import updatePagination, { PaginationState } from './pagination/reducer';
import updateUIState, { UIState } from './ui/reducer';

export type State = {
  userConfig: UserConfigState,
  entities: EntitiesState,
  pagination: PaginationState,
  ui: UIState,
};

export default function createStateReducer(): Reducer<State> {
  return combineReducers<State>({
    userConfig: updateUserConfig,
    entities: updateEntities,
    pagination: updatePagination,
    ui: updateUIState,
  });
}
