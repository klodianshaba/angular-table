export function overwriteObject(
  overwriteConfig: { [key: string]: any },
  config: { [key: string]: any }
): object {
  const obj: { [key: string]: any } = {};
  Object.keys(overwriteConfig).forEach(property => {
    if (config[property] instanceof Array) {
      obj[`${property}`] = overwriteConfig[property];
    } else if (config[property] instanceof Object) {
      obj[`${property}`] = {
        ...config[property],
        ...overwriteObject(overwriteConfig[property], config[property]),
      };
    } else {
      obj[`${property}`] = overwriteConfig[property];
    }
  });
  return { ...config, ...obj };
}
