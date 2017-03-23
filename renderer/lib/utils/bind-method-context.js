function selectValidMethodNames(object, candidates) {
  return candidates.filter(name =>
    typeof object[name] === 'function' && name !== 'constructor'
  );
}

export default function bindMethodContext(object) {
  const candidates = Object.getOwnPropertyNames(object.constructor.prototype);
  selectValidMethodNames(object, candidates).forEach(name => {
    object[name] = object[name].bind(object);
  });
}
