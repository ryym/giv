type AnyInstance = {
  constructor: Function,
  [field: string]: any,
};

function selectValidMethodNames(object: AnyInstance, candidates: string[]): string[] {
  return candidates.filter((name) =>
    typeof object[name] === 'function' && name !== 'constructor',
  );
}

export default function bindMethodContext(object: AnyInstance): void {
  const candidates = Object.getOwnPropertyNames(object.constructor.prototype);
  selectValidMethodNames(object, candidates).forEach((name) => {
    object[name] = object[name].bind(object);
  });
}
