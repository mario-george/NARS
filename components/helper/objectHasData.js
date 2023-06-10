const ObjectHasData = (ob) => {
  const keys = Object.keys(ob);
  const step = keys.filter(elm => ob[elm]);

  return step.reduce((a, b) => a && b);
}

export default ObjectHasData