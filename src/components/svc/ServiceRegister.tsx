import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Card, Col, Modal, Row } from 'antd';
import SvcTable from './Table';
import { CSearch } from './Search';
import { CInfoModal } from './InfoModal';
import { connectAlita } from 'redux-alita';
import { FormProps } from 'antd/lib/form';

type SvcRegProps = {
    setAlitaState: (param: any) => void;
    appKeys: any;
    tableSource: any[];
    info: any;
    visible: boolean;
    responsive: any;
} & FormProps;


class ServiceRegister extends React.Component<SvcRegProps, any> {

    componentDidMount(): void {
        const { setAlitaState } = this.props;

        let cookie = document.cookie;

        if (cookie) {
            let token = decodeURIComponent(cookie.split('=')[1]);
            setAlitaState({ funcName: 'getAppkeys', params: token, stateName: 'appKeys' });
            setAlitaState({ funcName: 'svcList', params: {}, stateName: 'tableSource' });
        }
    }

    render() {

        const {
            appKeys,
            tableSource: data = [],
            info,
            setAlitaState,
            responsive = { data: {} },
        } = this.props;

        const searchProps = {
            appKeys,
            submit(param: any) {
                setAlitaState({ funcName: 'svcList', params: param, stateName: 'tableSource' });
            },
        };

        const tableProps = {
            data,
            responsive,
            showInfoModal(param: any) {
                if (param === '') {
                    Modal.warning({
                        title: '服务已下线',
                        content: '重启服务或联系管理员',
                    });
                }
                setAlitaState({ stateName: 'info', data: { info: param, visible: true } });
            },
        };

        const modalProps = {
            info,
            closeInfoModal(param: any) {
                setAlitaState({ stateName: 'info', data: { info: param, visible: false } });
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

export default connectAlita(['responsive', 'appKeys', 'tableSource', 'info'])(ServiceRegister);
