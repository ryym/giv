import { push as pushHistory } from 'react-router-redux';
import { Action } from '../../action-types';

export const push = pushHistory as (path: string) => Action;
