import React, { Component } from 'react';
import Routes from './routes';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { Layout, notification, Icon } from 'antd';
import { ThemePicker } from './components/widget';
import { checkLogin } from './utils';
import { bindActionCreators } from 'redux';
import { appAction } from './redux/app';

const { Content, Footer } = Layout;

type AppProps = {
    auth: any;
    isMobile: boolean;
    windowChange: (param: any) => void;
    setAuth: (param: any) => void;
    logout: () => void;
};

class App extends Component<AppProps, any> {
    state = {
        collapsed: false,
        title: '',
    };

    componentWillMount() {
        const { setAuth } = this.props;
        let user, storageUser = localStorage.getItem('user');
        user = storageUser && JSON.parse(storageUser);
        user && setAuth(user);
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
        };
    }

    componentDidMount() {
        const openNotification = () => {
            notification.open({
                message: 'MSharp Admin',
                description: (
                        <div>欢迎加入锐竞<span role="img" aria-label="nerd">🤓</span>,一哩我哩 giao giao</div>
                ),
                icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
                duration: 0,
            });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const storageFirst = localStorage.getItem('isFirst');
        if (storageFirst) {
            const isFirst = JSON.parse(storageFirst);
            !isFirst && openNotification();
        }
    }

    getClientWidth = () => {
        // 获取当前浏览器宽度并设置responsive管理响应式
        const { windowChange } = this.props;
        const clientWidth = window.innerWidth;
        console.log(clientWidth);

        windowChange({ isMobile: clientWidth <= 992 });
        // receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { title } = this.state;
        const { auth = {}, isMobile, logout } = this.props;

        return (
                <DocumentTitle title={title}>
                    <Layout>
                        {!isMobile && checkLogin(auth.permissions) && (
                                <SiderCustom collapsed={this.state.collapsed} />
                        )}
                        <ThemePicker />
                        <Layout style={{ flexDirection: 'column' }}>
                            <HeaderCustom
                                    toggle={this.toggle}
                                    collapsed={this.state.collapsed}
                                    user={auth || {}}
                                    isMobile={isMobile}
                                    logout={logout}
                                    setAlitaState={this.props.windowChange}
                            />
                            <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                                <Routes auth={auth} />
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                MSharp-Admin ©{new Date().getFullYear()} Created by guoxiaohan@rjmart.cn
                            </Footer>
                        </Layout>
                    </Layout>
                </DocumentTitle>
        );
    }
}

const mapStateToProps = ({ app }: any) => ({ ...app });

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    windowChange: appAction.windowChange,
    setAuth: appAction.updateAuth,
    logout: appAction.logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
