import React, { Component } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { Card, Col, Modal, Row } from 'antd';

import BreadcrumbCustom from '../BreadcrumbCustom';
import SvcTable from './Table';
import { CSearch } from './Search';
import { CInfoModal } from './InfoModal';
import { connect } from 'react-redux';
import { svcAction } from '../../redux/svc';
import {
    DispatchProps, EditModalProps, ModalProps, SearchProps,
    StateProps, SvcProps, SvcState, TableProps,
} from '../../types/svc';
import { RootState } from '../../redux/root';
import { CEditModal } from './EditModal';

/**
 * @author maxwell
 * @desc service register route component
 */
class ServiceRegister extends Component<SvcProps, SvcState> {

    componentDidMount(): void {
        const { fetchAppKeys, fetchTableSource } = this.props;

        let cookie = document.cookie;
        if (cookie) {
            let token = decodeURIComponent(cookie.split('=')[1]);
            fetchAppKeys(token);
            fetchTableSource({});
        }
    }

    render() {

        const {
            appKeys = [],
            tableSource = [],
            record,
            info,
            isLoading,
            isMobile,
            visible,
            editVisible,
            total,

            fetchTableSource,
            showModal,
            showEditModal,
            closeModal,
        } = this.props;

        const searchProps: SearchProps = {
            appKeys,
            submit(param: any) {
                fetchTableSource(param);
            },
        };

        const tableProps: TableProps = {
            total,
            tableSource,
            isMobile,
            isLoading,
            showInfoModal(param: any) {
                if (param === '') {
                    Modal.warning({
                        title: '服务已下线',
                        content: '重启服务或联系管理员',
                    });
                }
                showModal(param);
            },
            showEditModal(param: any) {
                showEditModal(param);
            },
        };

        const modalProps: ModalProps = {
            info,
            visible,
            closeModal() {
                closeModal();
            },
        };

        const editModalProps: EditModalProps = {
            record,
            editVisible,
            closeModal() {
                closeModal();
            },
        };

        return (
                <div className="gutter-example">
                    <BreadcrumbCustom first="服务注册" second="注册详情" />

                    <Row gutter={16}>
                        <Col className="gutter-row" md={24}>
                            <Card bordered={false}>
                                <CSearch {...searchProps} />
                            </Card>
                        </Col>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <SvcTable {...tableProps} />
                                </Card>
                            </div>
                        </Col>
                    </Row>

                    <CInfoModal {...modalProps} />
                    <CEditModal {...editModalProps} />
                </div>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    const { svc, app: { isMobile } } = state;
    return ({ ...svc, isMobile });
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
        bindActionCreators({
            fetchAppKeys: svcAction.fetchAppKeys,
            fetchTableSource: svcAction.fetchTable,
            showModal: svcAction.showModal,
            showEditModal: svcAction.showEditModal,
            closeModal: svcAction.closeModal,
        }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRegister);
