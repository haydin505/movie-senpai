import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authenticated: false,
  userCredential: null,
  token: null,
  signupErrorMessage: null,
  loginErrorMessage: null,
};

const reducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        userCredential: action.userCredential,
        token: action.token,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        userCredential: null,
        token: null,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        userCredential: action.userCredential,
        token: action.token,
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        signupErrorMessage: action.error,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loginErrorMessage: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
