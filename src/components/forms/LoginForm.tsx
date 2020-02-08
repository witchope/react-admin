import React, { Component } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Form, Checkbox } from 'antd';
import { FormProps } from 'antd/lib/form';

const FormItem = Form.Item;

type NormalLoginFormProps = {} & FormProps;

class NormalLoginForm extends Component<NormalLoginFormProps> {
    handleSubmit = () => {
        // const [form] = Form.useForm();
        // form!.validateFields().then((values) => {
        //         console.log('Received values of form: ', values);
        // });
    };

    render() {
        // const { getFieldDecorator } = this.props.form!;
        return (
            <Form onFinish={this.handleSubmit}
                  style={{ maxWidth: '300px' }}
                  initialValues={{remember: true}}
            >
                <FormItem name="userName"
                          rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input prefix={<LegacyIcon type="user" style={{ fontSize: 13 }} />}
                            placeholder="用户名"
                    />
                </FormItem>
                <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                    <Input prefix={<LegacyIcon type="lock" style={{ fontSize: 13 }} />}
                            type="password"
                            placeholder="密码"
                    />
                </FormItem>
                <FormItem name="remember" valuePropName="checked" >
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
                     <span>或 现在就去注册!</span>
                </FormItem>
            </Form>
        );
    }
}

const LoginForm = NormalLoginForm;

export default LoginForm;
