import { makeUserConfigReader, UserConfigReader } from './user-config/reader';
import makeEntitiesReader, { EntitiesReader } from './entities/reader';
import makePaginationReader, { PaginationReader } from './pagination/reader';
import makeUIReader, { UIReader } from './ui/reader';
import { State } from './reducer';

export default function createStateReader(state: State) {
  return new StateReader(state);
}

export class StateReader {
  private readonly state: State;
  private cache: { [key: string]: any };

  constructor(state: State) {
    this.state = state;
    this.cache = {};
  }

  private getOrMake<R>(key: string, create: (state: State) => R) {
    if (! this.cache[key]) {
      this.cache[key] = create(this.state);
    }
    return this.cache[key] as R;
  }

  get userConfig(): UserConfigReader {
    return this.getOrMake('userConfig', (s) => makeUserConfigReader(s.userConfig));
  }

  get entities(): EntitiesReader {
    return this.getOrMake('entities', (s) => makeEntitiesReader(s.entities));
  }

  get pagination() {
    return this.getOrMake('pagination', (s) =>
      makePaginationReader(s.pagination, this.entities),
    );
  }

  get ui() {
    return this.getOrMake('ui', (s) => makeUIReader(s.ui));
  }
}
