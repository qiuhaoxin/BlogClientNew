import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import RouteApp from './routes';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import Reducers from './reducers';
const store=createStore(Reducers);
ReactDOM.render(<Provider store={store}>
    <RouteApp />
</Provider>,document.getElementById('app'));