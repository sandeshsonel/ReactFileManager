import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import fileManagerReducer from "./fileManager";
import accountReducer from "./account";

const persistConfig = {
   key: "root",
   storage,
   // Whitelist (Persist Specific Reducers)
   whitelist: ["account", "fileManager"],
   // Blacklist (Don't Persist Specific Reducers)
   // blacklist: ['authReducer.loading'],
};

const reducers = combineReducers({
   account: accountReducer,
   fileManager: fileManagerReducer,
});

export default persistReducer(persistConfig, reducers);
