import * as React from 'react'
import { Table} from 'antd'
import {Deal} from './Deal'

const concatProps = (...props: string[]) => (obj: any) =>
    props.map(prop => obj[prop]).filter(value => value !== undefined && value !== null).join(' ')

const columns = [
    {
        title: 'Представитель',
        dataIndex: 'signLastName',
        render: (text: any, record: Deal) =>
            concatProps('signLastName', 'signFirstName', 'signMidName')(record),
    }, {
        title: 'Наименования',
        dataIndex: 'fullCompanyName',
        render: (text: any, record: Deal) =>
            concatProps('type', 'shortCompanyName', 'fullCompanyName')(record),
    },
    {
        title: 'Договор',
        dataIndex: 'agreementNumber',
        render: (text: any, record: Deal) =>
            concatProps('agreementNumber', 'agreementDate')(record),
    },
]


class DealList extends React.Component<{data: Deal[], onRowClick: (deal: Deal) => any}> {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    }


    render() {


        return (
                <Table
                    onRowClick={this.props.onRowClick}
                    columns={columns}
                    dataSource={this.props.data}
                />
        )
    }
}

export default DealList
