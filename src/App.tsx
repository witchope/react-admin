import React, { EffectCallback, FunctionComponent, useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Layout, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons/lib';

import Routes from './routes';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { ThemePicker } from './components/widget';
import { appAction } from './redux/app';
import { RootState } from './redux/root';
import { AppProps, StateProps, DispatchProps } from './types/app';
import { checkLogin } from './utils';

const { Content, Footer } = Layout;
const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);
/**
 * @author maxwell
 * @classdesc application root root container component
 */
const App: FunctionComponent<AppProps> = (props: AppProps) => {

    const [collapsed, setCollapsed] = useState(false);

    const openNotification = () => {
        notification.open({
            message: 'MSharp Admin',
            description: (
                    <div>欢迎加入锐竞<span role="img" aria-label="nerd">🤓</span>,一哩我哩 giao giao</div>
            ),
            icon: <SmileOutlined style={{ color: 'red' }} />,
            duration: 0,
        });
        localStorage.setItem('isFirst', JSON.stringify(false));
    };

    const getClientWidth = () => {
        // 获取当前浏览器宽度并设置responsive管理响应式
        const { windowChange } = props;
        const clientWidth = window.innerWidth;
        console.log(clientWidth);

        windowChange({ isMobile: clientWidth <= 992 });
        // receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    useMountEffect(() => {
        const { setAuth } = props;
        let user, storageUser = localStorage.getItem('user');
        user = storageUser && JSON.parse(storageUser);
        user && setAuth(user);
        getClientWidth();
        const storageFirst = localStorage.getItem('isFirst');
        if (!storageFirst) {
            localStorage.setItem('isFirst', JSON.stringify(true));
        }
        window.onresize = () => {
            console.log('屏幕变化了');
            getClientWidth();
        };
    });

    useEffect(() => {
        const storageFirst = localStorage.getItem('isFirst');
        if (storageFirst) {
            const isFirst = JSON.parse(storageFirst);
            isFirst && openNotification();
        }
    }, []);

    const { auth = {}, isMobile, logout } = props;

    return (
            <Layout>
                {!isMobile && checkLogin(auth.permissions) && (<SiderCustom collapsed={collapsed} />)}
                <ThemePicker />
                <Layout style={{ flexDirection: 'column' }}>
                    <HeaderCustom
                            toggle={toggle}
                            collapsed={collapsed}
                            user={auth || {}}
                            isMobile={isMobile}
                            logout={logout}
                    />
                    <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                        <Routes auth={auth} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        MSharp-Admin ©{new Date().getFullYear()} Created by guoxiaohan@rjmart.cn
                    </Footer>
                </Layout>
            </Layout>
    );
};

const mapStateToProps = ({ app }: RootState): StateProps => ({ ...app });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
    windowChange: appAction.windowChange,
    setAuth: appAction.updateAuth,
    logout: appAction.logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
