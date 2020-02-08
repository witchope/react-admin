import React, { FunctionComponent } from 'react';
import { Select, Col, Row, Form, Button } from 'antd';
import { SearchProps } from '../../types/svc';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const colLayout = {
    xs: { span: 24 },
    sm: { span: 6 },
};

/**
 * @author maxwell
 * @desc search component
 */
const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {

    const [form] = Form.useForm();

    const addOption = (x: any) => {
        return <Select.Option key={x} value={x}>{x}</Select.Option>;
    };

    const handleSubmit = () => {
        const { submit } = props;
        form!.validateFields().then((values) => {
            console.log('Received values of form: ', values);
            submit(values);
        });
    };

    return (
            <Form {...formItemLayout}
                  form={form}
                  onFinish={handleSubmit}
            >
                <Row gutter={18}>
                    <Col {...colLayout}>
                        <Form.Item name="appkey" label="服务">
                            <Select showSearch
                                    filterOption={
                                        (input, option) =>
                                                option!.props.children!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    allowClear
                            >
                                {props.appKeys && props.appKeys.map(addOption)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col {...colLayout} >
                        <Form.Item name="env" label="环境">
                            <Select allowClear>
                                <Select.Option key="uat" value="uat">
                                    UAT
                                </Select.Option>
                                <Select.Option key="test" value="test">
                                    TEST
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Col>
                </Row>
            </Form>
    );
};

export const CSearch = Search;
