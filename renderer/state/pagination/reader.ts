import bindMethodContext from '../../lib/utils/bind-method-context';
import { PaginationState } from './reducer';
import { EntitiesReader } from '../entities/reader';
import { Notification } from '../../models/types';

export default function makePaginationReader(
  pagination: PaginationState,
  entitiesReader: EntitiesReader,
) {
  return new PaginationReader(pagination, entitiesReader);
}

export class PaginationReader {
  private readonly pagination: PaginationState;
  private readonly entities: EntitiesReader;

  constructor(pagination: PaginationState, entitiesReader: EntitiesReader) {
    this.pagination = pagination;
    this.entities = entitiesReader;
    bindMethodContext(this);
  }

  get unreadNotifications(): Notification[] {
    const { pagination, entities } = this;
    const unreadIDs = pagination.notifications.unread.ids;
    return unreadIDs.map((id) => entities.getNotification(id)!);
  }
}
