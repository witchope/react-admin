export interface ReducerState {
    auth: any;
    isMobile: boolean;
    logoutSuccess: boolean;
}

export interface StateProps extends ReducerState {

}

export interface DispatchProps {
    windowChange: any;
    setAuth: any;
    logout: any;
}

export type AppProps = StateProps & DispatchProps;

export type AppState = {
    collapsed: boolean,
    title: string,
};
