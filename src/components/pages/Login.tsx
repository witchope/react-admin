import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { PwaInstaller } from '../widget';
import { loginAction } from '../../redux/login'
import { LoginProps, LoginState } from '../../types/login';
import { RootState } from '../../redux/root';

const FormItem = Form.Item;

// type LoginProps = {
//     auth: any;
//     loginSuccess: boolean;
//     login: (param: any) => void;
//     rmAuth: () => void;
// } & RouteComponentProps & FormProps;

/**
 * @author maxwell
 * @description login page component
 */
class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            loginTimes: 0,
        };
    }

    componentDidMount() {
        this.props.rmAuth();
    }

    componentDidUpdate(prevProps: LoginProps, prevState: any) {
        // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        if (nextAuth && nextAuth.uid) {
            //判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth));
            history.push('/');
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { login } = this.props;
        this.props.form!.validateFields((err, values) => {
            if (!err) {
                const { userName, password } = values;
                console.log('Received values of form: ', values);

                const { loginTimes } = this.state;

                if (userName) {
                    login({ userName, password });

                    this.setState({
                        loginTimes: loginTimes + 1,
                    });
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form!;

        console.log("loginSuccess: " + this.props.loginSuccess);

        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>MSharp Admin</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                    placeholder="输入用户名"
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                    type="password"
                                    placeholder="输入密码"
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
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
            </div>
        );
    }
}

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

export const CLogin = connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));

