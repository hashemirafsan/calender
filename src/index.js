import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './Store/Reducers/_reducers';
import Thunk from 'redux-thunk';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import './index.css';

i18n.use(locale);

const store = createStore(
    Reducers,
    applyMiddleware(Thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
