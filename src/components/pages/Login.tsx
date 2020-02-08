import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Input, Button, Form, Checkbox } from 'antd';
import { UnlockOutlined, UserOutlined } from '@ant-design/icons/lib';
import { PwaInstaller } from '../widget';
import { loginAction } from '../../redux/login'
import { LoginProps } from '../../types/login';
import { RootState } from '../../redux/root';

const FormItem = Form.Item;

/**
 * @author maxwell
 * @description login page component
 */
const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {

    const [loginTimes, setLoginTimes] = useState(0);
    const [form] = Form.useForm();

    useEffect(() => {

        const { auth: nextAuth = {}, history } = props;
        if (nextAuth && nextAuth.uid) {
            //判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth));
            history.push('/');
        }

        return () => {
            props.rmAuth();
        }
    });

    const handleSubmit = () => {
        const { login } = props;
        form.validateFields().then((values: any) => {
            const { userName, password } = values;
            console.log('Received values of form: ', values);

            if (userName) {
                login({ userName, password });
                setLoginTimes(loginTimes + 1);
            }
        });
    };

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-logo">
                    <span>MSharp Admin</span>
                    <PwaInstaller />
                </div>
                <Form onFinish={handleSubmit}
                      form={form}
                      style={{ maxWidth: '300px' }}
                      initialValues={{remember: true}}
                >
                    <FormItem name="userName" rules={[{required: true, message: '请输入用户名!'}]}>
                        <Input prefix={<UserOutlined style={{ fontSize: 13 }} />}
                               placeholder="输入用户名"
                        />
                    </FormItem>
                    <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input prefix={<UnlockOutlined style={{ fontSize: 13 }} />}
                               type="password"
                               placeholder="输入密码"
                        />
                    </FormItem>
                    <FormItem name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                        <span className="login-form-forgot" style={{ float: 'right' }}>
                                忘记密码
                            </span>
                        <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ width: '100%' }}
                        >
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>);
};

const mapStateToProps = (state: RootState) => {
    const { login } = state;
    return { ...login };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        login: loginAction.logging,
        rmAuth: loginAction.rmAuth,
    }, dispatch);
};

export const CLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
