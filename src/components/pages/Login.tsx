/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {PwaInstaller} from '../widget';
import {connectAlita} from 'redux-alita';
import {RouteComponentProps} from 'react-router';
import {FormProps} from 'antd/lib/form';

const FormItem = Form.Item;

type LoginProps = {
    setAlitaState: (param: any) => void;
    auth: any;
} & RouteComponentProps &
    FormProps;

class Login extends React.Component<LoginProps, any> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            loginTimes: 0,
        }
    }

    componentDidMount() {
        const {setAlitaState} = this.props;
        setAlitaState({stateName: 'auth', data: null});
    }

    componentDidUpdate(prevProps: LoginProps, prevState: any) {
        // React 16.3+弃用componentWillReceiveProps
        const {auth: nextAuth = {}, history} = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) {
            // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }

        if (nextAuth.data && this.state.loginTimes > 0 && this.state.loginTimes !== prevState.loginTimes) {
            if (nextAuth.data.code === 200) {
                const user = {
                    uid: 1,
                    permissions: ["auth", "auth/testPage", "auth/authPage", "auth/authPage/edit", "auth/authPage/visit"],
                    role: "系统管理员",
                    roleType: 1,
                    userName: "开发者"
                };

                const {setAlitaState} = this.props;

                setAlitaState({stateName: 'auth', data: user});
            } else if (nextAuth.data.code === 500) {
                message.error(nextAuth.data.msg)
            }
        }


    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.form!.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {setAlitaState} = this.props;
                const {loginTimes} = this.state;
                if (values.userName) {
                    setAlitaState({
                        funcName: 'signin',
                        params: {
                            username: values.userName,
                            password: values.password,
                        },
                        stateName: 'auth'
                    });
                    this.setState({
                        loginTimes: loginTimes + 1,
                    })
                }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form!;

        debugger;

        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>MSharp Admin</span>
                        <PwaInstaller/>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                    placeholder="输入用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                    type="password"
                                    placeholder="输入密码"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
                            <span className="login-form-forgot" style={{float: 'right'}}>
                                忘记密码
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{width: '100%'}}
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

export default connectAlita(['auth'])(Form.create()(Login));
