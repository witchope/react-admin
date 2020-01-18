import { Epic, ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { createAction, createSlice } from '@reduxjs/toolkit';

import * as config from '../axios/config';
import { SvcState } from '../types/svc';

const initState: SvcState = {
    appKeys: [],
    tableSource: [],
    info: '',
    visible: false,
    isLoading: true,
    total: 0,
};

//-------------------------Slice-------------------------

export const svcSlice = createSlice({
    name: 'svc',
    initialState: initState,
    reducers: {
        APP_KEY_COMP: (state, action) => {
            state.appKeys = action.payload;
        },
        APP_KEY_FAIL: state => {
            state.appKeys = [];
        },
        TABLE_COMP: (state, { payload: { total, tableSource } }) => {
            state.tableSource = tableSource;
            state.total = total;
            state.isLoading = false;
            // Object.assign(state, { total, tableSource })
        },
        MODAL_SHOW: (state, action) => {
            state.visible = true;
            state.info = action.payload;
        },
        MODAL_CLOSE: (state, action) => {
            state.visible = false;
            state.info = action.payload;
        },
        DEFAULT: state => state,
    },
});

//-------------------------Action-------------------------

export const svcReducerAction = { ...(svcSlice.actions) };

export const svcEffectAction = {
    fetchAppKeys: createAction('APP_KEY_FETCHING', (payload) => ({ payload })),
    fetchTableSource: createAction('TABLE_FETCHING', (payload) => ({ payload })),
};

//-------------------------Effect-------------------------

export const svcEpic: Epic[] = [
    (action$) => {
        return action$.pipe(
            ofType(svcEffectAction.fetchAppKeys),
            mergeMap((action) => {
                    return ajax.post(config.APP_KEY_URL, {}, {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'token': action.payload,
                    }).pipe(
                        map(response => {
                            const { response: resp } = response;
                            if (resp.code === 200) {
                                const action = svcReducerAction.APP_KEY_COMP(resp.data);
                                return { ...action };
                            } else {
                                const action = svcReducerAction.APP_KEY_FAIL();
                                return { ...action };
                            }
                        }),
                    );
                },
            ),
        );
    },

    (action$) => action$.pipe(
        ofType(svcEffectAction.fetchTableSource.type),
        mergeMap(
            ({ payload: { pageNo: start = 1, pageSize: length = 10, appkey = '', env = '', _ = '1578968456453' } }) =>
                ajax.post(config.SVC_LIST_URL, {
                    start, length, appkey, env, _,
                }).pipe(
                    map(response => {
                        const { response: resp } = response;
                        const action = svcReducerAction.TABLE_COMP({
                            tableSource: resp.data,
                            total: resp.recordsTotal,
                        });
                        return { ...action };
                    }),
                ),
        ),
    ),
];
