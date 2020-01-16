import { map, mapTo, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import {ofType} from "redux-observable";
import {message } from 'antd'

enum ActionType {
    LOGGING,
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
}

export const loginAction = {
    logging: (payload: any) => {
       return {
          type: ActionType.LOGGING,
          payload,
       }
    },
    loginFulfilled: (payload: any) => ({
        type: ActionType.LOGIN_SUCCESS,
        payload
    }),
};

const LOGIN_URL = '/msharp-admin/login';

export const loginEpic = (action$: any) => action$.pipe(
    ofType(ActionType.LOGGING),
    mergeMap(({ payload }) => ajax
        .post(LOGIN_URL + `?userName=${payload.userName}&password=${payload.password}`)
        .pipe(map(response => {
            const { response: resp } = response;
            debugger;
            if (resp) {
                if (resp.code === 200) {
                    return loginAction.loginFulfilled(response);
                } else {
                    message.error(resp.msg);
                }
            }
        }))

   ),
    mapTo({ type: ActionType.LOGIN_SUCCESS })
);

const initState = {
    loginSuccess: false,
    auth: {},
};

export const loginReducer = (state: any = initState, action: any) => {
    debugger;
    switch (action.type) {
        case ActionType.LOGIN_ATTEMPT:
            return { ...state, ...action.payload };
        case ActionType.LOGIN_SUCCESS:
            return { ...state, ...action.payload, loginSuccess: true };
        default:
            return state;
    }
};
