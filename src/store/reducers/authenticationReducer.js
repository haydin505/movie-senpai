import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authenticated: false,
  userCredential: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        userCredential: action.userCredential,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
