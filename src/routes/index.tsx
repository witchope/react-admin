import React, { FunctionComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AllComponents from '../components';
import routesConfig, { IFMenuBase, IFMenu } from './config';
import queryString from 'query-string';
import { checkLogin } from '../utils';

type CRouterProps = {
    auth: any;
};

const CRouter: FunctionComponent<CRouterProps> = (props) => {

    const getPermits = (): any[] | null => {
        const { auth } = props;
        return auth ? auth.permissions : null;
    };

    const requireAuth = (permit: any, component: React.ReactElement) => {
        const permits = getPermits();
        // const { auth } = store.getState().http;
        if (!permits || !permits.includes(permit)) return <Redirect to={'404'} />;
        return component;
    };

    const requireLogin = (component: React.ReactElement, permit: any) => {
        const permits = getPermits();
        if (!checkLogin(permits)) {
            // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        return permit ? requireAuth(permit, component) : component;
    };

    const createRoute = (key: string) => {
        return routesConfig[key].map((r: IFMenu) => {
            const route = (r: IFMenuBase) => {
                const Component = r.component && AllComponents[r.component];
                return (
                        <Route
                                key={r.route || r.key}
                                exact
                                path={r.route || r.key}
                                render={props => {
                                    const reg = /\?\S*/g;
                                    // 匹配?及其以后字符串
                                    const queryParams = window.location.hash.match(reg);
                                    // 去除?的参数
                                    const { params } = props.match;
                                    Object.keys(params).forEach(key => {
                                        params[key] = params[key] && params[key].replace(reg, '');
                                    });
                                    props.match.params = { ...params };
                                    const merge = {
                                        ...props,
                                        query: queryParams ? queryString.parse(queryParams[0]) : {},
                                    };
                                    // 重新包装组件
                                    const wrappedComponent = (
                                            <>
                                                <Helmet>
                                                    <title>{r.title}</title>
                                                </Helmet>
                                                <Component {...merge} />
                                            </>
                                    );
                                    return r.login
                                            ? wrappedComponent
                                            : requireLogin(wrappedComponent, r.requireAuth);
                                }}
                        />
                );
            };

            const subRoute = (r: IFMenu): any =>
                    r.subs && r.subs.map((subR: IFMenu) => (subR.subs ? subRoute(subR) : route(subR)));

            return r.component ? route(r) : subRoute(r);
        });
    };

    return (
            <Switch>
                {Object.keys(routesConfig).map(key => createRoute(key))}
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
    );
};

export default CRouter;