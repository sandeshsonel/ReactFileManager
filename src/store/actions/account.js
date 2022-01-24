import {
   SET_IS_LOGIN_SUCCESS,
   SET_IS_SIGN_UP_SUCCESS,
   SET_USER_LOGOUT,
} from "../reducers/account";

export const setIsLogin = (details) => ({
   type: SET_IS_LOGIN_SUCCESS,
   payload: details,
});

export const setIsSignUp = (details) => ({
   type: SET_IS_SIGN_UP_SUCCESS,
   payload: details,
});

export const setLogout = () => ({
   type: SET_USER_LOGOUT,
});
