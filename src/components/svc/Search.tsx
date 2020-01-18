import React from 'react';
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
class Search extends React.Component<SearchProps> {

    addOption = (x: any) => {
        return <Select.Option key={x}>{x}</Select.Option>;
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form, submit } = this.props;

        form!.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                submit(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form!;
        const { appKeys } = this.props;

        let appKeyOptions = appKeys && appKeys.map(this.addOption);

        return (
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row gutter={18}>
                        <Col {...colLayout}>
                            <Form.Item label="服务">
                                {
                                    getFieldDecorator('appkey', {
                                        initialValue: '',
                                    })(
                                            <Select
                                                    showSearch
                                                    filterOption={
                                                        (input, option) =>
                                                                option.props.children!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    allowClear
                                            >
                                                {appKeyOptions}
                                            </Select>,
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col {...colLayout} >
                            <Form.Item label="环境">
                                {
                                    getFieldDecorator('env', {
                                        initialValue: '',
                                    })(
                                            <Select allowClear>
                                                <Select.Option key="uat">
                                                    UAT
                                                </Select.Option>
                                                <Select.Option key="test">
                                                    TEST
                                                </Select.Option>
                                            </Select>,
                                    )
                                }
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
    }

}

export const CSearch: any = Form.create()(Search);
