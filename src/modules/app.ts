import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { message } from 'antd';

enum ActionType {
    WIDTH_UPD = 'WIDTH_UPD',
    UPD_AUTH = 'UPD_AUTH',
}

export const appAction = {
    windowChange: (payload: any) => ({
        type: ActionType.WIDTH_UPD,
        payload,
    }),
    updateAuth: (payload: any) => ({
        type: ActionType.UPD_AUTH,
    }),
};

export const appEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(ActionType.WIDTH_UPD),
        // map(() => );
    );
};

const initialState = {
    isMobile: false,
};

export const appReducer = (state: any = initialState, { payload: { isMobile = false }, type }: any) => {
    switch (type) {
        case ActionType.WIDTH_UPD:
            return { ...state, isMobile };
        default:
            return state;
    }
};
