import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import firebase from 'firebase/compat';
// eslint-disable-next-line import/no-cycle
import { App } from './App';
import 'firebase/firestore';
import 'firebase/auth';
import './index.scss';

firebase.initializeApp({
  apiKey: 'AIzaSyD_7MQE8DGQwpVCooYvhUlMmdkZ0LfGqAY',
  authDomain: 'realtime-chat-22446.firebaseapp.com',
  projectId: 'realtime-chat-22446',
  storageBucket: 'realtime-chat-22446.appspot.com',
  messagingSenderId: '417013582742',
  appId: '1:417013582742:web:ee80c2af72da4740e82bb7',
  measurementId: 'G-6SKKXNZN3G',
});

const authChatApp = firebase.auth();
const firestore = firebase.firestore();

export const Context = createContext<Object | null>(null);

ReactDOM.render(
  <Context.Provider value={{
    firebase,
    authChatApp,
    firestore,
  }}
  >
    <Router>
      <App />
    </Router>
  </Context.Provider>,
  document.getElementById('root'),
);
