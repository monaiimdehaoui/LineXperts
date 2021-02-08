import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import Loader from 'react-loader-spinner';
import { usePromiseTracker} from "react-promise-tracker";

//"Root" of React Router (to enable the routing framework to work in the application).
//StrictMode helps finding coding errors liek unused variables, etc... good validation

//Loading mechanism root here
const LoadingIndicator = (props) => {
    const {promiseInProgress} = usePromiseTracker();
    return(
        promiseInProgress &&
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    );
}

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
          <LoadingIndicator/>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


