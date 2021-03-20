import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import RouteApp from './routes';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import Reducers from './reducers';
const sagaMiddleware=createSagaMiddleware();
const store=createStore(Reducers,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
ReactDOM.render(<Provider store={store}>
    <RouteApp />
</Provider>,document.getElementById('app'));