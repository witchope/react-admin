import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { loginEpic, loginReducer } from './login'
import { appReducer } from './app'

export const rootEpic = combineEpics(
    loginEpic
);

export const rootReducer = combineReducers({
    login: loginReducer,
    app: appReducer,
});
