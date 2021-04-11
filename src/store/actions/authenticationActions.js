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
  // console.log(userCredential);
  return {
    type: actionsTypes.LOGIN_SUCCESS,
    userCredential: userCredential,
    token: token,
  };
};

export const loginFail = (error) => {
  // console.log(error);
  return {
    type: actionsTypes.LOGIN_FAIL,
    error: error,
  };
};

// firebase
//   .auth()
//   .signInWithRedirect(firebase.auth().signInWithEmailAndPassword());

// firebase
//   .auth()
//   .getRedirectResult()
//   .then((res) => console.log(res));
export const persistLogin = () => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      firebase.auth().onAuthStateChanged(function (userCredential) {
        // console.log(userCredential);
        if (userCredential) {
          // console.log(userCredential !== null);
          resolve(userCredential !== null);
          dispatch(loginSuccess(userCredential, null));
        } else {
          // console.log(userCredential);
          reject("noUserFound");
        }
      });
    });
  };
};

// firebase
//   .auth()
//   .setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return firebase.auth().signInWithEmailAndPassword(email, password);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });

export const loginAttempt = (email, password) => {
  // console.log(email);
  // console.log(password);

  return (dispatch) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // console.log(userCredential.user);
            userCredential.user.getIdToken().then((res) => {
              dispatch(loginSuccess(userCredential.user, res));

              // console.log(res);
            });
          });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.message);
        dispatch(loginFail(error.message));
      });

    // return firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     console.log(userCredential.user);
    //     userCredential.user.getIdToken().then((res) => {
    //       dispatch(loginSuccess(userCredential.user, res));

    //       // console.log(res);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     dispatch(loginFail(error.message));
    //   });
  };
};

// export const loginAttempt = (email, password) => {
//   // console.log(email);
//   // console.log(password);
//   return (dispatch) => {
//     return firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         console.log(userCredential.user);
//         userCredential.user.getIdToken().then((res) => {
//           dispatch(loginSuccess(userCredential.user, res));

//           // console.log(res);
//         });
//       })
//       .catch((error) => {
//         console.log(error.message);
//         dispatch(loginFail(error.message));
//       });
//   };
// };

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
    });
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
        // console.log(userCredential);
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
