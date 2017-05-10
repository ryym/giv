/**
 * Run multiple async operations concurrently
 * within the specified max running count.
 * (XXX: There may be more better implementation?)
 */
export default function runWithLimit(max = 1, {
  nextTick = (f: () => void) => setTimeout(f, 50),
} = {}) {
  let nSpaces = max;

  const waitIfNecessary = () => new Promise((resolve) => {
    const check = () => {
      if (nSpaces > 0) {
        nSpaces -= 1;
        return resolve();
      }
      nextTick(check);
    };
    check();
  });

  return function waitAndRun<T>(makePromise: () => Promise<T>): Promise<T> {
    return waitIfNecessary().then(() => {
      return makePromise()
        .then((value) => {
          nSpaces += 1;
          return value;
        })
        .catch((err) => {
          nSpaces += 1;
          throw err;
        });
    });
  };
}
