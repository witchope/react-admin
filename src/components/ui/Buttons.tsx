/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Row, Col, Card, Button, Radio, Menu, Dropdown } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ClickParam } from 'antd/lib/menu';
import { ButtonSize } from 'antd/lib/button';

type ButtonsState = {
    size: ButtonSize;
    loading: boolean;
    iconLoading: boolean;
};
class Buttons extends React.Component<any, ButtonsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            size: 'middle',
            loading: false,
            iconLoading: false,
        };
    }

    handleSizeChange = (e: RadioChangeEvent) => {
        this.setState({ size: e.target.value });
    };
    handleMenuClick = (e: ClickParam) => {
        console.log('click', e);
    };
    enterLoading = () => {
        this.setState({ loading: true });
    };
    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    };
    render() {
        const size = this.state.size;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">1st item</Menu.Item>
                <Menu.Item key="2">2nd item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
        );
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="UI" second="按钮" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary">Primary</Button>
                                <Button>Default</Button>
                                <Button type="dashed">Dashed</Button>
                                <Button type="danger">Danger</Button>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" shape="circle" icon={<LegacyIcon type="search" />} />
                                <Button type="primary" icon={<LegacyIcon type="search" />}>
                                    Search
                                </Button>
                                <Button shape="circle" icon={<LegacyIcon type="search" />} />
                                <Button icon={<LegacyIcon type="search" />}>Search</Button>
                                <br />
                                <Button shape="circle" icon={<LegacyIcon type="search" />} />
                                <Button icon={<LegacyIcon type="search" />}>Search</Button>
                                <Button type="dashed" shape="circle" icon={<LegacyIcon type="search" />} />
                                <Button type="dashed" icon={<LegacyIcon type="search" />}>
                                    Search
                                </Button>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Radio.Group value={size} onChange={this.handleSizeChange}>
                                    <Radio.Button value="large">Large</Radio.Button>
                                    <Radio.Button value="default">Default</Radio.Button>
                                    <Radio.Button value="small">Small</Radio.Button>
                                </Radio.Group>
                                <br />
                                <br />
                                <Button type="primary" shape="circle" icon={<LegacyIcon type="download" />} size={size} />
                                <Button type="primary" icon={<LegacyIcon type="download" />} size={size}>
                                    Download
                                </Button>
                                <Button type="primary" size={size}>
                                    Normal
                                </Button>
                                <br />
                                <Button.Group size={size}>
                                    <Button type="primary">
                                        <LegacyIcon type="left" />
                                        Backward
                                    </Button>
                                    <Button type="primary">
                                        Forward
                                        <LegacyIcon type="right" />
                                    </Button>
                                </Button.Group>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary">primary</Button>
                                <Button>secondary</Button>
                                <Dropdown overlay={menu}>
                                    <Button>
                                        more <LegacyIcon type="down" />
                                    </Button>
                                </Dropdown>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" loading>
                                    Loading
                                </Button>
                                <Button type="primary" size="small" loading>
                                    Loading
                                </Button>
                                <br />
                                <Button
                                    type="primary"
                                    loading={this.state.loading}
                                    onClick={this.enterLoading}
                                >
                                    Click me!
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<LegacyIcon type="poweroff" />}
                                    loading={this.state.iconLoading}
                                    onClick={this.enterIconLoading}
                                >
                                    Click me!
                                </Button>
                                <br />
                                <Button shape="circle" loading />
                                <Button type="primary" shape="circle" loading />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <style>{`
                    .button-demo .ant-btn {
                        margin-right: 8px;
                        margin-bottom: 12px;
                    }
                `}</style>
            </div>
        );
    }
}

export default Buttons;
