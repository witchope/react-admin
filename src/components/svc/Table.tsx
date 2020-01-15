import React, {CSSProperties} from 'react';
import {Button, Table, Tag, Tooltip} from 'antd';
import {ColumnProps} from 'antd/lib/table';

const columns: ColumnProps<any>[] = [
    {title: 'ID', width: 100, dataIndex: 'id', key: 'id', fixed: 'left'},
    {title: '应用（AppKey）', width: 200, dataIndex: 'appkey', key: 'appkey', fixed: 'left'},
    {
        title: '环境（ENV）',
        dataIndex: 'env',
        width: 120,
        key: 'env',
        render: (x: any) => {
            let color = 'geekblue';
            switch (x) {
                case 'uat':
                    color = "purple";
                    break;
                case 'test':
                    color = "volcano";
                    break;

            }
            return <Tag color={color}>{x.toUpperCase()}</Tag>
        }
    },
    {
        title: '服务（ServiceName）',
        dataIndex: 'serviceName',
        key: '2',
        render: (x: any) => {
            return <span style={{color: "#313653"}}>{x}</span>
        }
    },
    {
        title: '版本',
        width: 120,
        dataIndex: 'version',
        key: '3',
        render: (x: any) => {
            const style: CSSProperties = {
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            };
            return (<Tooltip title={x}><span style={style}>{x}</span></Tooltip>);
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 120,
        key: '4',
        render: (x: any) => {
            let text: any;
            switch (x) {
                case 0:
                    text = <Tag color="green">正常</Tag>;
                    break;
                case 1:
                    text = <Tag color="orange">锁定</Tag>;
                    break;
                case 2:
                    text = <Tag color="red">禁用</Tag>;
                    break;
                case 3:
                    text = <Tag color="grey">已下线</Tag>;
                    break;
            }
            return text;
        }
    },
    {
        title: '操作',
        key: 'operation',
        width: 150,
        fixed: 'right',
        render: () => (
            <span>
                <Button type="primary" size="small">编辑</Button>
                <Button type="default" size="small">删除</Button>
            </span>
        ),

    },
];

type TableProps = {
    data: any;
    showInfoModal: (param: any) => void;
}

class ServiceTable extends React.Component<TableProps, any> {

    render() {
        const {data, showInfoModal} = this.props;

        let source = [];

        if (data && data.data && data.data.data && !(data.isFetching)) {
            source = data.data.data;
        }

        return (
            <Table
                loading={data.isFetching}
                columns={columns}
                dataSource={source}
                bordered
                scroll={{x: 1300}}
                rowKey={((record) => record.id)}
                onRow={record => {
                    return {
                        onDoubleClick: () => {
                            showInfoModal(record.data);
                        },
                    };
                }}
            />);
    }
}

export default ServiceTable;
