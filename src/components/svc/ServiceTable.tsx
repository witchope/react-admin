import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Table, Tag, Tooltip } from 'antd';
import { TableProps } from '../../types/svc';
import { ColumnProps } from 'antd/lib/table/Column';

/**
 * @param props
 * @constructor
 */
const SvcTable: FunctionComponent<TableProps> = (props) => {

    const [total, setTotal] = useState(0);
    
    const { tableSource, showInfoModal, isMobile, isLoading } = props;
    
    useEffect(() => {
        setTotal(props.total);
    }, [props.total]);

    const columns: ColumnProps<any>[] = [
        // {title: 'ID', width: 100, dataIndex: 'id', key: 'id', fixed: 'left'},
        { title: '应用（AppKey）', width: 200, dataIndex: 'appkey', key: 'appkey', fixed: 'left' },
        {
            title: '环境（ENV）',
            dataIndex: 'env',
            width: 120,
            key: 'env',
            render: (x: any) => {
                let color = 'geekblue';
                switch (x) {
                    case 'uat':
                        color = 'purple';
                        break;
                    case 'test':
                        color = 'volcano';
                        break;

                }
                return <Tag color={color}>{x.toUpperCase()}</Tag>;
            },
        },
        {
            title: '服务（ServiceName）',
            dataIndex: 'serviceName',
            key: '2',
            render: (x: any) => {
                return <span style={{ color: '#313653' }}>{x}</span>;
            },
        },
        {
            title: '版本',
            width: 120,
            dataIndex: 'version',
            key: '3',
            render: (x: any) => {
                const text = x.length > 10 ? x.substr(0, 9) + '...' : x;
                return (<Tooltip title={x}><span>{text}</span></Tooltip>);
            },
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
            },
        },
        {
            title: '操作',
            key: 'operation',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                    <span>
                            <Button type="primary" size="small"
                                    onClick={() => props.showEditModal(record)}
                            >编辑</Button>
                            <Button type="default" size="small">删除</Button>
                        </span>
            ),

        },
    ];

    if (isMobile) {
        columns[0].fixed = false;
        columns[5].fixed = false;
    } else {
        columns[0].fixed = 'left';
        columns[5].fixed = 'right';
    }

    return (
            <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={tableSource}
                    pagination={{
                        total,
                    }}
                    bordered
                    scroll={{ x: 1300 }}
                    rowKey={((record) => record.id)}
                    onRow={record => {
                        return {
                            onDoubleClick: () => {
                                showInfoModal(record.data);
                            },
                        };
                    }}
            />
    );
};

export default SvcTable;
