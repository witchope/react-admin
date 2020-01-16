import { map, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import {ofType} from "redux-observable";
import {message } from 'antd'

enum ActionType {
    LOGGING,
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
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
    loginRefuse: () => ({
        type: ActionType.LOGIN_FAILED
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
        }))

   )
    // mapTo({ type: ActionType.LOGIN_SUCCESS })
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
            return { ...state, auth: action.payload, loginSuccess: true };
        case ActionType.LOGIN_FAILED:
            return { ...state, loginSuccess: true };
        default:
            return state;
    }
};
