/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get, post } from './tools';
import * as config from './config';

export const getBbcNews = () => get({ url: config.NEWS_BBC });

export const npmDependencies = () =>
    axios
        .get('./npm.json')
        .then(res => res.data)
        .catch(err => console.log(err));

export const weibo = () =>
    axios
        .get('./weibo.json')
        .then(res => res.data)
        .catch(err => console.log(err));

export const gitOauthLogin = () =>
    get({
        url: `${config.GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`,
    });
export const gitOauthToken = (code: string) =>
    post({
        url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
        data: {
            client_id: '792cdcd244e98dcd2dee',
            client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
            redirect_uri: 'http://localhost:3006/',
            state: 'reactAdmin',
            code,
        },
    });
// {headers: {Accept: 'application/json'}}
export const gitOauthInfo = (access_token: string) =>
    get({ url: `${config.GIT_USER}access_token=${access_token}` });

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });

const LOGIN_URL = '/msharp-admin/login';
const APP_KEY_URL = '/pearl-server/pearl/app/name/list';
const LOGOUT_URL = '/msharp-admin/logout';
const SVC_LIST_URL = '/msharp-admin/registry/pageList';

export const signin = ({username, password}: any) => {
    return post({
        url: LOGIN_URL + `?userName=${username}&password=${password}`,
    });
};

export const getAppkeys = (token: string) => {
    return post({
        url: APP_KEY_URL + `?token=${token}`,
        config: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token,
            },
            withCredentials: true
        }
    });
};

export const logout = () => {
    return post({
        url: LOGOUT_URL,
        config: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true
        }
    });
};

export const svcList = ({pageNo = 0, pageSize = 10, appkey = '', env = '', _ = '1578968456453'}) => {
    return post({
        url: SVC_LIST_URL + `?start=${pageNo}&length=${pageSize}&appkey=${appkey}&env=${env}&_=${_}`,
        config: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true
        }
    });
};

