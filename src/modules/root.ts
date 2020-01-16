import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { loginEpic, loginReducer } from './login'

export const rootEpic = combineEpics(
    loginEpic
);

export const rootReducer = combineReducers({
    login: loginReducer
});
