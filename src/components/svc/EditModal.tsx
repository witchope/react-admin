import React, { FunctionComponent } from 'react';
import { Form, Input, Modal } from 'antd';
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
                                                          form,
                                                          record,
                                                          editVisible,
                                                          closeModal,
                                                      }: EditModalProps): JSX.Element => {

    return (
            <Modal title="编辑" visible={editVisible} onCancel={closeModal}>
                <Form {...formItemLayout}>
                    <Form.Item label="应用">
                        {
                            form!.getFieldDecorator('appkey', {
                                initialValue: record.appkey,
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label="环境">
                        {
                            form!.getFieldDecorator('env', {
                                initialValue: record.env,
                            })(<Input disabled />)
                        }
                    </Form.Item>
                    <Form.Item label="服务名">
                        {
                            form!.getFieldDecorator('serviceName', {
                                initialValue: record.serviceName,
                            })(<Input disabled />)
                        }
                    </Form.Item>
                </Form>
            </Modal>
    );
};

export const CEditModal = Form.create()(EditModal);

