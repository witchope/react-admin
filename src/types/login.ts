import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';

export interface ReducerState {
    auth: any;
    loginSuccess: boolean;
}

export interface DispatchProps {
    login: (param: any) => void;
    rmAuth: () => void;
}

export type LoginProps = ReducerState & DispatchProps & RouteComponentProps & FormProps;

export type LoginState = {
    loginTimes: number,
};
