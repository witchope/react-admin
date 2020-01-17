import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { loginEpic, loginReducer } from './login';
import { appEpic, appReducer } from './app';
import { svcEpic, svcReducer } from './svc';

export const rootEpic = combineEpics(
    appEpic,
    loginEpic,
    ...svcEpic,
);

export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    svc: svcReducer,
});
