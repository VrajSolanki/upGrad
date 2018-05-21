
//Object comparison function

export const isObjectEqual = (obj1, obj2) => {
  if(!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  if (obj1 === obj2) {
    return true;
  }

  const item1Keys = Object.keys(obj1).sort();
  const item2Keys = Object.keys(obj2).sort();

  if (!isArrayEqual(item1Keys, item2Keys)) {
    return false;
  }
  return item2Keys.every(key => {
    const value = obj1[key];
    const nextValue = obj2[key];

    if (value === nextValue) {
      return true;
    }
    return Array.isArray(value) &&
      Array.isArray(nextValue) &&
      isArrayEqual(value, nextValue);
  });
};


//Create reducer dynamically

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

//Create constants:

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}
