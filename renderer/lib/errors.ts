export default class Errors extends Error {
  readonly cause: Error;

  constructor(cause: Error, message: string) {
    super(`${message} (${cause.message || '?'})`);
    this.cause = cause;
  }
}
