import { filter, map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Epic } from 'redux-observable';
import { createSlice, Draft } from '@reduxjs/toolkit';
import { ReducerState } from '../types/app';

const initialState: ReducerState = {
    isMobile: false,
    auth: {},
    logoutSuccess: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        windowChange: (state: Draft<ReducerState>, { payload }) => {
            state.isMobile = payload.isMobile || false;
        },
        updateAuth: (state: Draft<ReducerState>, { payload }) => {
            state.auth = payload;
        },
        logout: (state: Draft<ReducerState>) => state,
        logoutFulfilled: (state: Draft<ReducerState>) => {
            state.logoutSuccess = false;
        },
    },
});

export const appAction = { ...(appSlice.actions) };

const LOGOUT_URL = '/msharp-admin/logout';

export const appEpic: Epic = (action$: any) => {
    return action$.pipe(
        filter(appAction.logout.match),
        mergeMap(() =>
            ajax({
                url: LOGOUT_URL,
                method: 'POST',
                withCredentials: true,
            }).pipe(map(() => appAction.logoutFulfilled()))),
    );
};

