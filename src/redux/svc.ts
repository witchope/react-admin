import { Epic } from 'redux-observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import * as config from '../axios/config';
import { ReducerState } from '../types/svc';

const initState: ReducerState = {
    appKeys: [],
    tableSource: [],
    info: '[]',
    record: {},
    editVisible: false,
    visible: false,
    isLoading: true,
    total: 0,
};

//-------------------------Slice-------------------------

export const svcSlice = createSlice({
    name: 'svc',
    initialState: initState,
    reducers: {
        appKeyFulfilled: (state: Draft<ReducerState>, action: PayloadAction<any>) => {
            state.appKeys = action.payload;
        },
        appKeyFailed: state => {
            state.appKeys = [];
        },
        tableFulfilled: (state: Draft<ReducerState>, { payload: { total, tableSource } }) => {
            state.tableSource = tableSource;
            state.total = total;
            state.isLoading = false;
        },
        showModal: (state: Draft<ReducerState>, action: PayloadAction<any>) => {
            state.visible = true;
            state.info = action.payload;
        },
        showEditModal: (state: Draft<ReducerState>, { payload }) => {
            state.editVisible = true;
            state.record = payload;
        },
        closeModal: (state: Draft<ReducerState>, action: PayloadAction<any>) => {
            state.visible = false;
            state.editVisible = false;
        },
        fetchTable: (state: Draft<ReducerState>, action: PayloadAction<any>) => {
        },
        fetchAppKeys: (state: Draft<ReducerState>, action: PayloadAction<any>) => {
        },
    },
});

//-------------------------Action-------------------------

export const svcAction = { ...(svcSlice.actions) };

//-------------------------Effect-------------------------

export const svcEpic: Epic[] = [
    (action$) => {
        return action$.pipe(
            filter(svcAction.fetchAppKeys.match),
            mergeMap((action) => {
                    return ajax.post(config.APP_KEY_URL, {}, {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'token': action.payload,
                    }).pipe(
                        map(response => {
                            const { response: resp } = response;
                            if (resp.code === 200) {
                                const action = svcAction.appKeyFulfilled(resp.data);
                                return { ...action };
                            } else {
                                const action = svcAction.appKeyFailed();
                                return { ...action };
                            }
                        }),
                    );
                },
            ),
        );
    },

    (action$) => action$.pipe(
        filter(svcAction.fetchTable.match),
        mergeMap(
            ({ payload: { pageNo: start = 1, pageSize: length = 10, appkey = '', env = '', _ = '1578968456453' } }) =>
                ajax.post(config.SVC_LIST_URL, {
                    start, length, appkey, env, _,
                }).pipe(
                    map(response => {
                        const { response: resp } = response;
                        const action = svcAction.tableFulfilled({
                            tableSource: resp.data,
                            total: resp.recordsTotal,
                        });
                        return { ...action };
                    }),
                ),
        ),
    ),
];
