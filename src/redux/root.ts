import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { loginEpic, loginSlice } from './login';
import { appEpic, appSlice } from './app';
import { svcEpic, svcSlice } from './svc';

export const rootEpic = combineEpics(
    appEpic,
    loginEpic,
    ...svcEpic,
);

export const rootReducer = combineReducers({
    app: appSlice.reducer,
    login: loginSlice.reducer,
    svc: svcSlice.reducer,
});

interface IState {
}

export type RootState = ReturnType<typeof rootReducer> & IState;
