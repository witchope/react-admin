import React, { FunctionComponent, useEffect, useState } from 'react';
import screenfull from 'screenfull';
import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import { Badge, Layout, Menu, Popover } from 'antd';
import { gitOauthInfo, gitOauthToken } from '../axios';
import { queryString } from '../utils';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PwaInstaller } from './widget';
import {
    ArrowsAltOutlined,
    BarsOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
} from '@ant-design/icons/lib';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

type HeaderCustomProps = RouteComponentProps<any> & {
    toggle: () => void;
    collapsed: boolean;
    user: any;
    isMobile?: boolean;
    path?: string;
    logout: () => void;
};

const HeaderCustom: FunctionComponent<HeaderCustomProps> = (props) => {

    // const [user, setUser] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const QueryString = queryString() as any;
        let _user,
                storageUser = localStorage.getItem('user');

        _user = (storageUser && JSON.parse(storageUser)) || '测试';

        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then((res: any) => {
                gitOauthInfo(res.access_token).then((info: any) => {
                    // setUser(info);
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            // setUser(_user);
        }
    }, []);

    const screenFull = () => {
        if (screenfull && screenfull.isEnabled) {
            screenfull.request();
        }
    };

    const menuClick = (e: { key: string }) => {
        e.key === 'logout' && logout();
    };

    const logout = () => {
        const { logout } = props;
        logout();
        console.log(props);
        localStorage.removeItem('user');
        props.history.push('/login');
    };

    const popoverHide = () => {
        setVisible(false);
    };

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };

    const { isMobile } = props;

    return (
            <Header className="custom-theme header">
                {isMobile ? (
                        <Popover
                                content={<SiderCustom popoverHide={popoverHide} />}
                                trigger="click"
                                placement="bottomLeft"
                                visible={visible}
                                onVisibleChange={handleVisibleChange}
                        >
                            <BarsOutlined className="header__trigger custom-trigger" />
                        </Popover>
                ) : (
                        props.collapsed ?
                                <MenuUnfoldOutlined className="header__trigger custom-trigger"
                                                    onClick={props.toggle}
                                />
                                : <MenuFoldOutlined className="header__trigger custom-trigger"
                                                    onClick={props.toggle}
                                  />
                )}
                <Menu
                        mode="horizontal"
                        style={{ lineHeight: '64px', float: 'right' }}
                        onClick={menuClick}
                >
                    <Menu.Item key="pwa">
                        <PwaInstaller />
                    </Menu.Item>
                    <Menu.Item key="full" >
                        <ArrowsAltOutlined onClick={screenFull} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
                            <NotificationOutlined />
                        </Badge>
                    </Menu.Item>
                    <SubMenu
                            title={
                                <span className="avatar">
                                <img src={avater} alt="头像" />
                                <i className="on bottom b-white" />
                            </span>
                            }
                    >
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {props.user.userName}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout">
                                <span onClick={logout}>退出登录</span>
                            </Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
    );
};

export default withRouter(HeaderCustom);
