import { normalize, schema } from 'normalizr';

const { Entity } = schema;

const userSchema = new Entity('user', {}, {
  idAttribute: 'login',
});

const repositorySchema = new Entity('repository', {
  owner: userSchema,
}, {
  idAttribute: 'full_name',
});

const notificationSchema = new Entity('notification', {
  repository: repositorySchema,
});

// XXX: Should we convert snake_case to camelCase?
// camelCase is common in JS but convertion may be a performance cost.
export default function normalizeNotifications(notifications) {
  return normalize(notifications, [notificationSchema]);
}