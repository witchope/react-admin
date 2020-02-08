/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';

import { Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import { Input, Form, Button } from 'antd';
import { FormProps } from 'antd/lib/form';

const FormItem = Form.Item;

function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

type HorizontalLoginFormProps = {} & FormProps;

class HorizontalLoginForm extends Component<HorizontalLoginFormProps> {

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form!.validateFields();
    }

    handleSubmit = () => {
        // e.preventDefault();
        // this.props.form!.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //     }
        // });
    };
    render() {

        const [form] = Form.useForm();

        const {
            getFieldsError,
            getFieldError,
            isFieldTouched,
        } = form!;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" form={form} onFinish={this.handleSubmit}>
                <FormItem name="userName"
                          rules={[{ required: true, message: '请输入用户名!' }]}
                          validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}
                >
                    <Input prefix={<LegacyIcon type="user" style={{ fontSize: 13 }} />}
                            placeholder="用户名"
                    />
                </FormItem>
                <FormItem name="password"
                          rules={[{ required: true, message: '请输入密码!' }]}
                          validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}
                >
                    <Input prefix={<LegacyIcon type="lock" style={{ fontSize: 13 }} />}
                            type="password"
                            placeholder="密码"
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default HorizontalLoginForm;
