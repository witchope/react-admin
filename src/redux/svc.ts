import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import * as config from '../axios/config';

//-------------------------Action-------------------------
enum ActionType {
    FETCH_APPKEYS = 'FETCH_APPKEYS',
    FETCH_TABLE = 'FETCH_TABLE',
    FETCH_APPKEYS_FULFILLED = 'FETCH_APPKEYS_FULFILLED',
    FETCH_APPKEYS_REFUSE = 'FETCH_APPKEYS_REFUSE',
    FETCH_TABLE_FULFILLED = 'FETCH_TABLE_FULFILLED',
    FETCH_TABLE_REFUSED = 'FETCH_TABLE_REFUSED',
    DEFAULT_STATE = 'DEFAULT_STATE',
}

export const svcAction = {
    defaultState: () => ({
        type: ActionType.DEFAULT_STATE,
    }),
    fetchAppKeys: (payload: string) => ({
        type: ActionType.FETCH_APPKEYS,
        payload,
    }),
    fetchAppKeysFulFilled: (payload: string) => ({
        type: ActionType.FETCH_APPKEYS_FULFILLED,
        payload,
    }),
    fetchTableSource: (payload: any) => ({
        type: ActionType.FETCH_TABLE,
        payload,
    }),
    fetchTableFulfiled: (payload: any) => ({
        type: ActionType.FETCH_TABLE_FULFILLED,
        payload,
    }),
};

//-------------------------Epic-------------------------
const appKeyEpic = (action$: any) => {
    return action$.pipe(
        ofType(ActionType.FETCH_APPKEYS),
        mergeMap((action: any) => {
                return ajax.post(config.APP_KEY_URL + `?token=${action.payload}`, null, {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': action.payload,
                }).pipe(
                    map(response => {
                        const { response: resp } = response;
                        if (resp.code === 200) {
                            return svcAction.fetchAppKeysFulFilled(resp.data);
                        } else {
                            return svcAction.defaultState();
                        }
                    }),
                );
            },
        ),
    );
};

const tableEpic = (action$: any) => {
    return action$.pipe(
        ofType(ActionType.FETCH_TABLE),
        mergeMap(({ payload: { pageNo = 1, pageSize = 10, appkey = '', env = '', _ = '1578968456453' } }: any) => {
                return ajax.post(config.SVC_LIST_URL + `?start=${pageNo}&length=${pageSize}&appkey=${appkey}&env=${env}&_=${_}`, null, {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }).pipe(
                    map(response => {
                        debugger;
                        const { response: resp } = response;
                        if (resp.data && resp.data.length > 0) {
                            return svcAction.fetchTableFulfiled(resp.data);
                        } else {
                            return svcAction.defaultState();
                        }
                    }),
                );
            },
        ),
    );
};

export const svcEpic = [
    appKeyEpic,
    tableEpic
];

//-------------------------Reducer-------------------------

const initState = {
    appKeys: [],
    tableSource: [],
    info: {},
    visible: false,
};

export const svcReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case ActionType.FETCH_APPKEYS_FULFILLED:
            return { ...state, appKeys: action.payload };
        case ActionType.FETCH_APPKEYS_REFUSE:
            return { ...state, appKeys: [] };
        case ActionType.FETCH_TABLE_FULFILLED:
            return { ...state, tableSource: action.payload };
        default:
            return state;
    }
};