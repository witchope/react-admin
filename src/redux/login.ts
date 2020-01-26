import { filter, map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Epic } from 'redux-observable';
import { message } from 'antd';
import { LOGIN_URL } from '../axios/config';
import { createSlice, Draft } from '@reduxjs/toolkit';
import { ReducerState } from '../types/login';

const initState: ReducerState = {
    loginSuccess: false,
    auth: {},
};

export const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        logging: (state: Draft<ReducerState>, action) => {
        },
        loginFulfilled: (state: Draft<ReducerState>, action) => {
            state.auth = action.payload;
            state.loginSuccess = true;
        },
        loginRefuse: (state: Draft<ReducerState>) => {
            state.loginSuccess = false;
        },
        rmAuth: (state: Draft<ReducerState>) => {
            state.auth = null;
        },
    },
});

export const loginAction = { ...(loginSlice.actions) };

export const loginEpic: Epic = (action$: any) => action$.pipe(
    filter(loginAction.logging.match),
    mergeMap(({ payload }) =>
        ajax.post(LOGIN_URL, { ...payload })
            .pipe(
                map(response => {
                    const { response: resp } = response;
                    if (resp) {
                        if (resp.code === 200) {
                            const user = {
                                uid: 1,
                                permissions: ['auth', 'auth/testPage', 'auth/authPage', 'auth/authPage/edit', 'auth/authPage/visit'],
                                role: '系统管理员',
                                roleType: 1,
                                userName: '开发者',
                            };
                            return loginAction.loginFulfilled(user);
                        } else {
                            message.error(resp.msg);
                            return loginAction.loginRefuse();
                        }
                    }
                })),
    ),
);
