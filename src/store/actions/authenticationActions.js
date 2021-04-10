import * as actionsTypes from "../actions/actionTypes";
import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBovpZ-7fYGF-3ew3XCMkVSz9vrTBKjH5w",
  authDomain: "movie-senpai.firebaseapp.com",
  databaseURL: "https://movie-senpai-default-rtdb.firebaseio.com",
  projectId: "movie-senpai",
  storageBucket: "movie-senpai.appspot.com",
  messagingSenderId: "948348789552",
  appId: "1:948348789552:web:7476474a081d0627255ef5",
  measurementId: "G-QKWJ89T1GZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

export const loginSuccess = (userCredential, token) => {
  return {
    type: actionsTypes.LOGIN_SUCCESS,
    userCredential: userCredential,
    token: token,
  };
};

export const loginAttempt = (email, password) => {
  return (dispatch) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user.getIdToken().then((res) => {
          dispatch(loginSuccess(userCredential.user, res));

          console.log(res);
        });
      })
      .catch((err) => console.log(err.message));
  };
};
