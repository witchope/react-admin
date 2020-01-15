/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { PwaInstaller } from '../widget';
import { connectAlita } from 'redux-alita';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';

const FormItem = Form.Item;

type LoginProps = {
    setAlitaState: (param: any) => void;
    auth: any;
} & RouteComponentProps &
    FormProps;

class Login extends React.Component<LoginProps> {

    componentDidMount() {
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });
    }

    componentDidUpdate(prevProps: LoginProps) {
        // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) {
            // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }

        if (nextAuth.data && nextAuth.data.code === 200) {
            const user = {
                uid: 1, 
                permissions: ["auth","auth/testPage","auth/authPage","auth/authPage/edit","auth/authPage/visit"],
                role: "系统管理员",
                roleType: 1,
                userName:"开发者"
            };

            const { setAlitaState } = this.props;

            setAlitaState({ stateName: 'auth', data: user });
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.form!.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { setAlitaState } = this.props;
                if (values.userName === 'admin' && values.password === 'admin')
                    setAlitaState({ funcName: 'admin', stateName: 'auth' });
                if (values.userName === 'guest' && values.password === 'guest')
                    setAlitaState({ funcName: 'guest', stateName: 'auth' });
                if (values.userName === 'guoxiaohan') {
                    setAlitaState({ 
                        funcName: 'signin',
                        params: {
                            username: values.userName, 
                            password: values.password 
                        },
                        stateName: 'auth'
                    });
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form!;
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
                                />
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
                                />
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
export default connectAlita(['auth'])(Form.create()(Login));
