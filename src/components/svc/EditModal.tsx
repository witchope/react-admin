import React, { FunctionComponent } from 'react';
import { Form, Input, Modal } from 'antd';
import { EditModalProps } from '../../types/svc';

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
            <Modal visible={editVisible} onCancel={closeModal}>
                <Form>
                    <Form.Item label="应用">
                        {
                            form!.getFieldDecorator('appkey', {
                                initialValue: record.appkey,
                            })
                            (<Input />)
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
                                initialValue: record.serviceName
                            })(<Input />)
                        }
                    </Form.Item>
                </Form>
            </Modal>
    );
};

export const CEditModal = Form.create()(EditModal);

