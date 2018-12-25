import * as React from 'react'
import {Table} from 'antd'
import {Deal} from './Deal'
import PopConfirm from 'antd/es/popconfirm'

const concatProps = (...props: string[]) => (obj: any) =>
    props.map(prop => obj[prop]).filter(value => value !== undefined && value !== null).join(' ')


class DealList extends React.Component<{
    data: Deal[], onRowClick: (deal: Deal)
        => any, onDeleteConfirm: (deal: Deal) => any
}> {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    }

    render() {
        return (
            <Table
                columns={[
                    {
                        title: 'Представитель',
                        dataIndex: 'signLastName',
                        render: (text: any, record: Deal) =>
                            <a onClick={this.props.onRowClick}>
                                {concatProps('signLastName', 'signFirstName', 'signMidName')(record)}
                            </a>,
                    }, {
                        title: 'Наименования',
                        dataIndex: 'fullCompanyName',
                        render: (text: any, record: Deal) =>
                            <a onClick={this.props.onRowClick}>
                                {concatProps('type', 'shortCompanyName', 'fullCompanyName')(record)}
                            </a>,
                    },
                    {
                        title: 'Договор',
                        dataIndex: 'agreementNumber',
                        render: (text: any, record: Deal) =>
                            <a onClick={this.props.onRowClick}>
                                {concatProps('agreementNumber', 'agreementDate')(record)}
                            </a>,
                    }, {
                        title: 'Action',
                        key: 'x',
                        render: (text: any, record: Deal) =>
                            <PopConfirm title='Sure to delete?' onConfirm={() => this.props.onDeleteConfirm(record)}>
                                <a href='javascript:;'>Delete</a>
                            </PopConfirm>,
                    },
                ]}
                dataSource={this.props.data}
            />
        )
    }
}

export default DealList
