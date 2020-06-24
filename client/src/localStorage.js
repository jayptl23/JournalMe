export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('journals');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('journals', serializedState);
  } catch (err) {
    // ignore write errors
  }
};
