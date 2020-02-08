import React, { FunctionComponent } from 'react';
import { Input, Modal, Form } from 'antd';
import { EditModalProps } from '../../types/svc';

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

/**
 * Edit modal component
 */
const EditModal: FunctionComponent<EditModalProps> = ({
                                                          record,
                                                          editVisible,
                                                          closeModal,
                                                      }: EditModalProps): JSX.Element => {
    const [form] = Form.useForm();
    const { appkey, env, serviceName } = record;

    return (
            <Modal title="编辑" visible={editVisible} onCancel={closeModal}>
                <Form {...formItemLayout} form={form} initialValues={{appkey, env, serviceName}}>
                    <Form.Item label="应用" name="appkey" >
                        <Input />
                    </Form.Item>
                    <Form.Item label="环境" name="env">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="服务名" name="serviceName">
                        <Input disabled />
                    </Form.Item>
                </Form>
            </Modal>
    );
};

export const CEditModal = EditModal;

