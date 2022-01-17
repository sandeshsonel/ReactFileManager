import { PURGE } from "redux-persist/es/constants";

export const SET_IS_LOGIN_SUCCESS = "SET_IS_LOGIN_SUCCESS";
export const SET_IS_SIGN_UP_SUCCESS = "SET_IS_SIGN_UP_SUCCESS";
export const SET_USER_LOGOUT = "SET_USER_LOGOUT";

const initialState = {
   isLogin: true,
   token: null,
   user: null,
};

const accountReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_IS_LOGIN_SUCCESS:
         return {
            ...state,
            isLogin: true,
            ...action.payload,
         };
      case SET_IS_SIGN_UP_SUCCESS:
         return {
            ...state,
            isLogin: true,
            ...action.payload,
         };
      case SET_USER_LOGOUT:
         return initialState;
      case PURGE:
         return initialState;
      default:
         return state;
   }
};

export default accountReducer;
