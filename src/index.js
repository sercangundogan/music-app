import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Prodiver
import { Provider } from "react-redux";

// React-Redux Connection
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";

// Redux Thunk
import thunk from "redux-thunk";

// Redux - Firestore connection
import { createFirestoreInstance, } from 'redux-firestore'

// React-Redux-Firebase connection  
import { ReactReduxFirebaseProvider, } from 'react-redux-firebase';

// Firebase Config File
import firebaseConfig from "./config/firebase"

import firebase from "firebase/app"

const initialState = {}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)))

const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  firebaseConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}





ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
document.getElementById("root"));


