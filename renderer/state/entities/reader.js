import bindMethodContext from '../../lib/utils/bind-method-context';

export default function makeEntitiesReader(entities) {
  return new EntitiesReader(entities);
}

class EntitiesReader {
  constructor(entities) {
    this.entities = entities;
    bindMethodContext(this);
  }

  getNotification(id) {
    return this.entities.notifications.byID[id];
  }

  getRepository(fullName) {
    return this.entities.repositories.byFullName[fullName];
  }

  getIssue(url) {
    return this.entities.issues.byURL[url];
  }
}
