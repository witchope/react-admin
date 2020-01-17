import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Card, Col, Modal, Row } from 'antd';
import SvcTable from './Table';
import { CSearch } from './Search';
import { CInfoModal } from './InfoModal';
import { FormProps } from 'antd/lib/form';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { svcAction } from "../../redux/svc";

type SvcRegProps = {
    // setAlitaState: (param: any) => void;
    appKeys: any;
    tableSource: any[];
    info: any;
    visible: boolean;
    responsive: any;
    fetchAppKeys: (param: string) => void;
    fetchTableSource: (param: any) => void;
} & FormProps;


class ServiceRegister extends React.Component<SvcRegProps, any> {

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

        debugger;
        const {
            appKeys = [],
            tableSource = [],
            info,
            responsive = { data: {} },
        } = this.props;

        const searchProps = {
            appKeys,
            submit(param: any) {
                // setAlitaState({ funcName: 'svcList', params: param, stateName: 'tableSource' });
            },
        };

        const tableProps = {
            tableSource,
            responsive,
            showInfoModal(param: any) {
                if (param === '') {
                    Modal.warning({
                        title: '服务已下线',
                        content: '重启服务或联系管理员',
                    });
                }
                // setAlitaState({ stateName: 'info', data: { info: param, visible: true } });
            },
        };

        const modalProps = {
            info,
            closeInfoModal(param: any) {
                // setAlitaState({ stateName: 'info', data: { info: param, visible: false } });
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
            </div>
        );
    }
}

const mapStateToProps = ({ svc }: any) => ({ ...svc });

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    fetchAppKeys: svcAction.fetchAppKeys,
    fetchTableSource: svcAction.fetchTableSource
}, dispatch);

// export default connectAlita(['responsive', 'appKeys', 'tableSource', 'info'])(ServiceRegister);
export default connect(mapStateToProps, mapDispatchToProps)(ServiceRegister);
