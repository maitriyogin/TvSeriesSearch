export const enumToObject = <T extends Object>(theEnum: T) =>
  Object.entries(theEnum).reduce((acc, [key, value]) => {
    return typeof value === 'number' ? acc : {...acc, [value]: key};
  }, {});
