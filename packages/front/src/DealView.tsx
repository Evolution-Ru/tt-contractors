import * as React from 'react'
import {Modal} from 'antd'
import {Deal} from './Deal'
import Input from 'antd/lib/input/Input'


export default class DealView extends
    React.Component<{deal: Deal, onSuccess: (deal: Deal) => any, visible: boolean, onCancel: any} > {

    state = {
        deal: {} as any as Deal,
        confirmLoading: false,
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.deal !== this.props.deal)
            this.setState({confirmLoading: false, deal: nextProps.deal})
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        })

        this.props.onSuccess(this.state.deal)
    }

    updateDeal = (deal: Deal) => {
        console.log('Update deal', deal)
        this.setState({deal})
    }

    updateProp = (prop: string) => (e: any) => {
        this.updateDeal(
            Object.assign(
                {},
                this.state.deal,
                {
                    [prop]: e.target.value,
                }
            )
        )
    }


    render() {
        const {deal, visible} = this.props

        if (!deal)
            return null

        const createInput = (prop: string, label?: string ) =>
                <Input
                    addonBefore={<div style={{width: '100px'}}>{label}</div>}
                    value={this.state.deal[prop] || ''}
                    onChange={this.updateProp(prop)}
                />


        const {confirmLoading} = this.state
        return (
            <Modal
                title={this.state.deal.id ? ' Редактирование записи' : 'Новая запись'}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.props.onCancel}
            >

                Подписант
                {createInput('signLastName', 'Фамилия')}
                {createInput('signFirstName', 'Имя')}
                {createInput('signMidName', 'Отчество')}
                {createInput('signPosition', 'Должность')}
                {createInput('signReason', 'Основание')}

                Паспорт подписанта
                {createInput('signPassportNumber', 'Серия и номер')}
                {createInput('signPassportDate', 'Дата выдачи')}
                {createInput('signPassportDepartment', 'Пункт выдачи')}
                {createInput('signPassportDepartmentCode', 'Код подразделения')}

                Подрядчик
                {createInput('type', 'Тип')}
                {createInput('fullLegalName', 'Полное наименование')}
                {createInput('shortLegalName', 'Краткое наименование')}
                {createInput('legalAddress', 'Адрес')}
                {createInput('inn', 'ИНН')}
                {createInput('kpp', 'КПП')}
                {createInput('ogrn', 'ОГРН')}
                {createInput('phone', 'Телефон')}

                Банковские реквизиты
                {createInput('bankName', 'Название')}
                {createInput('BIK', 'БИК')}
                {createInput('checkingAccount', 'Расчетный счет')}
                {createInput('correspondentAccount', 'Кореспондентский счет')}
                {createInput('bankComment', 'Комментарий')}

                Договор
                {createInput('agreementNumber', 'Номер')}
                {createInput('agreementDate', 'Дата')}
            </Modal>
        )
    }
}
