import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';

enum ActionType {
    WIDTH_UPD = 'WIDTH_UPD',
    UPD_AUTH = 'UPD_AUTH',
    LOGOUT = 'LOGOUT',
    LOGOUT_FULFILLED = 'LOGOUT_FULFILLED',
}

export const appAction = {
    windowChange: (payload: any) => ({
        type: ActionType.WIDTH_UPD,
        payload,
    }),
    updateAuth: (payload: any) => ({
        type: ActionType.UPD_AUTH,
        payload
    }),
    logout: () => ({
        type: ActionType.LOGOUT,
    }),
    logoutFulfilled: () => ({
        type: ActionType.LOGOUT_FULFILLED,
    })
};

const LOGOUT_URL = '/msharp-admin/logout';

export const appEpic = (action$: any) => {
    return action$.pipe(
        ofType(ActionType.LOGOUT),
        mergeMap(() =>
            ajax({
                url: LOGOUT_URL,
                method: 'POST',
                withCredentials: true,
            }).pipe(map(() => appAction.logoutFulfilled()))),
    );
};

const initialState = {
    isMobile: false,
    auth: {},
    logoutSuccess: false,
};

export const appReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case ActionType.WIDTH_UPD:
            const { payload: { isMobile = false } = {} } = action;
            return { ...state, isMobile };
        case ActionType.UPD_AUTH:
            const { payload: auth } = action;
            return { ...state, auth };
        case ActionType.LOGOUT_FULFILLED:
            return { ...state, logoutSuccess: true };
        default:
            return state;
    }
};
