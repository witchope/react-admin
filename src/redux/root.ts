import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { loginEpic, loginReducer } from './login';
import { appEpic, appReducer } from './app';
import { svcEpic, svcSlice } from './svc';

export const rootEpic = combineEpics(
    appEpic,
    loginEpic,
    ...svcEpic,
);

export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    svc: svcSlice.reducer,
});

interface IState {

}

export type RootState = ReturnType<typeof rootReducer> & IState;
