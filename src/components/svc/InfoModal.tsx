import React from 'react';
import { Col, Form, Input, Modal, Pagination, Row } from 'antd';
import { ModalProps } from '../../types/svc';

/**
 * @author maxwell
 * @desc Information modal
 */
class InfoModal extends React.Component<ModalProps, any> {

    constructor(props: ModalProps) {
        super(props);
        this.state = {
            modalData: [],
            current: 0,
        };
    }

    componentDidUpdate(prevProps: Readonly<ModalProps>, prevState: Readonly<any>, snapshot?: any): void {
        const { info } = this.props;

        if (info && prevProps.info !== info) {
            const arr = JSON.parse(info);
            if (arr.length > 0) {
                this.setState(() => {
                    return {
                        modalData: arr,
                    };
                });
            }
        }
    }

    close = () => {
        const { closeInfoModal } = this.props;
        this.setState(() => {
            return {
                modalData: [],
            };
        });
        closeInfoModal('[]');
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        const { form } = this.props;

        form!.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    changePage = (page: number) => {
        this.setState(() => {
            return {
                current: page,
            };
        });
    };

    render() {
        // const {getFieldDecorator, setFieldsValue} = this.props.form!;
        const { modalData, current } = this.state;
        const { visible } = this.props;

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

        let appkey = '';
        let ip = '';
        let port = '';
        let transportType = '';
        let status = '';
        let weight = '';
        if (modalData.length > 0 && modalData[0].appkey) {
            appkey = modalData[current].appkey;
            ip = modalData[current].ip;
            port = modalData[current].port;
            transportType = modalData[current].transportType.toUpperCase();
            status = modalData[current].status;
            weight = modalData[current].weight;
        }

        return (
            <Modal visible={visible} onCancel={this.close}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row gutter={18}>
                        <Col span={24}>
                            <Form.Item label="服务">
                                {
                                    // getFieldDecorator('appkey', {
                                    //     initialValue: '',
                                    // })(
                                    <Input disabled value={appkey} />
                                    // )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="IP">
                                <Input disabled value={ip} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="PORT">
                                <Input disabled value={port} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="传输协议">
                                <Input disabled value={transportType} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="状态">
                                <Input disabled value={status} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="负载权重">
                                <Input disabled value={weight} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Pagination simple size="small" total={modalData.length * 10} onChange={this.changePage} />
            </Modal>
        );
    }

}

export const CInfoModal: any = Form.create()(InfoModal);
