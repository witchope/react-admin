import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Page from './Page';
import './style/lib/animate.css';
import './style/antd/index.less';
import './style/index.less';
import configureStore from './store';

ReactDOM.render(
        <Provider store={configureStore()}>
            <Page />
        </Provider>
        ,
        document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
