import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

// import { updateMaze } from './store/actions'
// const ORIGINAL_MAZE = [
//   [0, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1, 0, 0],
//   [1, 1, 0, 0, 2, 1, 2, 0],
//   [0, 1, 0, 1, 0, 1, 0, 0],
//   [0, 0, 0, 1, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 0],
//   [0, 1, 0, 0, 0, 0, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
// ];
// store.dispatch(
//   updateMaze()
// )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
