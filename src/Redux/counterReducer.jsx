const initialState = {
  count: 20,
};

const counterReducer = (state = initialState, action) => {
  // console.log(action, "action");
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        // count: state.count + 1,
        count: action.payload,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    case "RESET":
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

export default counterReducer;
