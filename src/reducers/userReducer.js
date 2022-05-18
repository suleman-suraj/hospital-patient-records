const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case "REGISTER_USER":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isPending: false,
        userInfo: "",
      };
    default:
      return state;
  }
};
export default userReducer;
