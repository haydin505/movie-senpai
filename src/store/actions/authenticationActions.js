import * as actionsTypes from "../actions/actionTypes";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// ui.start("#firebaseui-auth-container", {
//   signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
//   // Other config options...
// });

// export const loginSuccess = (token, userId) => {
//   return {
//     type: actionsTypes.LOGIN_SUCCESS,
//     token: token,
//     userId: userId,
//   };
// };

function writeUserData(userId, name, email, imageUrl) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      name: name,
      email: email,
    });
}

export const loginSuccess = (userCredential, token) => {
  return {
    type: actionsTypes.LOGIN_SUCCESS,
    userCredential: userCredential,
    token: token,
  };
};

export const loginFail = (error) => {
  console.log(error);
  return {
    type: actionsTypes.LOGIN_FAIL,
    error: error,
  };
};

export const loginAttempt = (email, password) => {
  // console.log(email);
  // console.log(password);
  return (dispatch) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        userCredential.user.getIdToken().then((res) => {
          dispatch(loginSuccess(userCredential.user, res));

          // console.log(res);
        });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(loginFail(error.message));
      });
  };
};

export const logout = () => {
  console.log("A");
  return {
    type: actionsTypes.LOGOUT,
  };
};

export const signupSuccess = (userCredential, token) => {
  return {
    type: actionsTypes.SIGNUP_SUCCESS,
    userCredential: userCredential,
    token: token,
  };
};

export const signupFail = (error) => {
  return {
    type: actionsTypes.SIGNUP_FAIL,
    error: error,
  };
};

export const signupAttempt = (name, email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        userCredential.user.getIdToken().then((res) => {
          dispatch(signupSuccess(userCredential.user, res));
          writeUserData(
            userCredential.user.uid,
            name,
            userCredential.user.email
          );
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(signupFail(error.message));
      });
  };
};
