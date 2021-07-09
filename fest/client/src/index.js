import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import { createStore,applyMiddleware,compose } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios'

import App from './components/App'
import reducers from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)));

axios.interceptors.request.use( request => {
    request.baseURL = 'http://127.0.0.1:4000';
    

    if(request.url.includes('admin')){
        request.headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;
        return request;
    }
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return request;
});


ReactDom.render(
    
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
