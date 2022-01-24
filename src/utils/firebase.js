import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { loginWithFirebaseApi } from "requests/account";
import { setIsLogin } from "store/actions/account";

console.log(process.env);

const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APP_ID,
   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth;
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => async (dispatch) => {
   try {
      const { additionalUserInfo, credential, user } =
         await auth().signInWithPopup(googleProvider);

      console.log(additionalUserInfo, credential, user);
      const userObj = {
         isNewUser: additionalUserInfo.isNewUser,
         fullName: additionalUserInfo.profile.name,
         email: additionalUserInfo.profile.email,
         photoUrl: additionalUserInfo.profile.picture,
         userId: user.multiFactor.user.uid,
      };
      const response = await loginWithFirebaseApi(userObj);
      console.log(response);
      if (response.data.status === "1") {
         dispatch(
            setIsLogin({
               isLoginWithGoogle: true,
               user: response.data,
               token: {
                  accessToken: user.multiFactor.user.accessToken,
                  idToken: credential.idToken,
               },
            }),
         );
         return {
            error: false,
         };
      } else if (response.data.status === "0") {
         return {
            error: true,
            message: response.data.message,
         };
      }
   } catch (error) {
      console.log(error);
      return {
         error: true,
         message: error,
      };
   }
};
