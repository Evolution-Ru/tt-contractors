import * as React from 'react'
import {Button, Modal, Spin} from 'antd'
import {Deal} from './Deal'
import Input from 'antd/lib/input/Input'
import {AxiosInstance} from 'axios'

export default class DriversView extends React.Component<{ deal: Deal | null, visible: boolean, onCancel: any, api: AxiosInstance }> {

    state = {
        driversLoading: false,
        drivers: [] as object[],
        confirmLoading: false,
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.deal) {
            this.loadDrivers(nextProps.deal.id)
        }
    }

    loadDrivers = (dealId: number) => {
        this.setState({driversLoading: true, drivers: null})
        this.props.api.get('drivers', {params: {dealId}})
            .then(res => {
                this.setState({driversLoading: false, drivers: res.data})
            })
            .catch(err => {
                alert(err)
            })
    }

    addDriver = () => {
        const drivers = this.state.drivers.concat({})
        this.setState({drivers})
    }

    deleteDriver = (index: number) => {
        const drivers = this.state.drivers.concat()
        drivers.splice(index, 1)
        this.setState({drivers})
    }

    handleOk = () => {
        this.setState({confirmLoading: true})
        this.props.api.post('drivers', this.state.drivers, {params: {dealId: this.props.deal ? this.props.deal.id : ''}})
            .then(res => {
                this.props.onCancel()
                this.setState({confirmLoading: false})
            })
            .catch(err => {
                alert(err)
                this.setState({confirmLoading: false})
            })
    }

    updateProp = (driverIndex: number, prop: string) => (e: any) => {
        const drivers = this.state.drivers
        drivers[driverIndex][prop] = e.target.value
        this.setState({drivers})
    }

    render() {
        const {deal, visible} = this.props
        if (!deal)
            return null

        const {driversLoading, drivers, confirmLoading} = this.state

        const renderSpin = () => {
            if (driversLoading) {
                return <Spin/>
            }
            return ''
        }

        const createInput = (driverIndex: number, prop: string, label?: string) =>
            <Input
                addonBefore={<div style={{width: '250px'}} title={label}>{label}</div>}
                value={this.state.drivers[driverIndex][prop] || ''}
                onChange={this.updateProp(driverIndex, prop)}
            />

        const driverList = () => {
            if (!drivers) {
                return ''
            }
            return drivers.map((driver, index) =>
                <div key={index}>
                    <a style={{float: 'right'}} onClick={() => this.deleteDriver(index)}>x</a>
                    <h3>Водитель {index + 1}</h3>

                    {createInput(index, 'fullName', 'ФИО')}
                    {createInput(index, 'phone', '№ контактного телефона')}
                    {createInput(index, 'birthDate', 'Дата рождения')}
                    {createInput(index, 'passportNumber', 'Серия / номер паспорта')}
                    {createInput(index, 'passportDate', 'Дата выдачи')}
                    {createInput(index, 'passportDepartment', 'Кем выдан')}
                    {createInput(index, 'passportDepartmentCode', 'Код подразделения')}
                    {createInput(index, 'addressRegister', 'Адрес регистрации')}
                    {createInput(index, 'addressActual', 'Адрес фактический')}
                    {createInput(index, 'drivingLicenseNumber', '№ водительского удостоверения')}
                    {createInput(index, 'autoName', 'Марка и модель автомобиля')}
                    {createInput(index, 'autoNumber', 'Гос номер автомобиля')}
                    {createInput(index, 'autoSts', 'СТС тягача')}
                    {createInput(index, 'trailerName', 'Марка и модель прицепа')}
                    {createInput(index, 'trailerNumber', 'Гос номер прицепа')}
                    {createInput(index, 'trailerSts', 'СТС прицепа')}
                </div>
            )
        }

        return (
            <Modal
                title={'Водители ' + deal.signLastName + ' ' + deal.signFirstName + ' ' + deal.signMidName}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.props.onCancel}
                width={620}
            >
                {renderSpin()}

                {driverList()}

                <br/>

                <div>
                    <Button onClick={this.addDriver}>
                        Добавить водителя
                    </Button>

                </div>
            </Modal>
        )
    }
}
