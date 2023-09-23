import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './redux/configureStore'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <React.StrictMode>
    <script src="http://localhost:8097"></script>
    <App />
    </React.StrictMode>
  </Provider>
  
);

reportWebVitals();
