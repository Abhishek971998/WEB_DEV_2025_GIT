export const increment = (data) => ({
  type: "INCREMENT",
  payload: data,
});

export const decrement = () => ({
  type: "DECREMENT",
});

export const reset = () => ({
  type: "RESET",
});
