import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import persistConfig from "./persistConfig";
import rootReducer from "./rootReducer";

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
