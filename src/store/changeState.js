const initialState = {
  sidebarShow: "responsive",
};

const ChangeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};
export default ChangeState;
