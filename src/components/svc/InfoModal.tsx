import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Form, Input, Modal, Pagination, Row } from 'antd';
import { ModalProps } from '../../types/svc';

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

// const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

/**
 * @author maxwell
 * @desc Information modal
 */
const InfoModal: FunctionComponent<ModalProps> = (props: ModalProps) => {

    const [current, setCurrent] = useState(0);
    const [modalData, setModalData] = useState([{
        appkey: '',
        ip: '',
        port: '',
        transportType: '',
        status: '',
        weight: '',
    }]);

    const close = () => {
        const { closeModal } = props;
        setModalData([]);
        closeModal();
    };

    const [form] = Form.useForm();

    const changePage = (page: number) => {
        setCurrent(page);
    };

    useEffect(()=> {
        const arr = JSON.parse(props.info);
        if (arr.length > 0) {
            setModalData(arr)
        }
    }, [props.info]);

    useEffect(() => {
        if (modalData.length > 0) {
            const values = {
                appkey: modalData[current].appkey,
                ip: modalData[current].ip,
                port: modalData[current].port,
                transportType: modalData[current].transportType.toUpperCase(),
                status: modalData[current].status,
                weight: modalData[current].weight,
            };
            form!.setFieldsValue(values);
        }
    }, [current, modalData, form]);

    return (
            <Modal title="服务详情" visible={props.visible} onCancel={close} >
                <Form {...formItemLayout} initialValues={modalData[current]} form={form} >
                    <Row gutter={18}>
                        <Col span={24}>
                            <Form.Item name="appkey" label="服务">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="ip" label="IP">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="port" label="PORT">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="transportType" label="传输协议">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="status" label="状态">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="weight" label="负载权重">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Pagination simple size="small" total={modalData.length * 10} onChange={changePage} />
            </Modal>
    );
};

export const CInfoModal = InfoModal;
