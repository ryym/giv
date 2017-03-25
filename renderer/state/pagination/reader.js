import bindMethodContext from '../../lib/utils/bind-method-context';

export default function makePaginationReader(pagination, entitiesReader) {
  return new PaginationReader(pagination, entitiesReader);
}

class PaginationReader {
  constructor(pagination, entitiesReader) {
    this.pagination = pagination;
    this.entities = entitiesReader;
    bindMethodContext(this);
  }

  get unreadNotifications() {
    const { pagination, entities } = this;
    const unreadIDs = pagination.notifications.unread.ids;
    return unreadIDs.map(entities.getNotification);
  }
}
