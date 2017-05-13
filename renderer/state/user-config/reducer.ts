import {
  UpdateToken,
  LoadUserConfigSuccess,
} from '../../actions';
import { Action } from '../../redux/actions';
import { composeReducer, on } from '../../redux/reducer';
import { UserConfig } from '../../models/types';

export type UserConfigState = UserConfig | null;

export const updateUserConfig = composeReducer<UserConfigState>(null, [
  on(LoadUserConfigSuccess, (current: UserConfigState, config) => {
    return Object.assign({}, config);
  }),

  on(UpdateToken, (config: UserConfigState, { accessToken }) => {
    return Object.assign({}, config, { accessToken });
  }),
]);
