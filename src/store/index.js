import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";

const middleware = [thunk, logger];

// if (isClient && isDeveloping) {
// if (process.env.REACT_APP_ENV !== "production") {
//   const devToolsExtension = window.devToolsExtension;
//   if (typeof devToolsExtension === "function") {
//     enhancers.push(devToolsExtension());
//   }
// }

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

const storeValue = {
  store,
  persistor,
};

export default storeValue;
