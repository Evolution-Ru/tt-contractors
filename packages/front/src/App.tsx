import * as React from 'react'
import 'antd/dist/antd.css'
import {Deal} from './Deal'
import DealList from './DealList'
import axios from 'axios'
import DealView from './DealView'
import Button from 'antd/lib/button/button'
import Input from 'antd/lib/input/Input'


type AppState = Partial<{
    data: Deal[],
    search: string,
    dealViewIsOpen: boolean,
    deal: Deal
}>

const api = axios.create({baseURL: window.location.hostname === 'localhost' ? 'http://localhost:3001/' : '/'})

class App extends React.Component<any, AppState> {

    state = {
        data: [],
        search: '',
        dealViewIsOpen: false,
        deal: {} as Deal,
    }

    componentDidMount() {
        this.getAll().then(() => null)
    }


    getAll = () =>
        api.get('deals')
            .then(response => this.setState({data: response.data}))

    onSearch = (event: React.FormEvent<any>) => {
        const search = event.target['value'] as string
        console.log(search)
        this.setState({search})
        if (search.length === 0)
            this.getAll()
        else
            api.post('search?search=' + event.target['value'], {search}).then(this.updateList)
    }

    updateList = (response: any) =>
        this.setState({data: response.data})

    onClose = () =>
        this.setState({dealViewIsOpen: false})

    onRequestAdd = () =>
        this.setState({dealViewIsOpen: true, deal: {}})

    onAdd = (deal: Deal) =>
        api.post('deals', deal)
            .then(response => this.setState({data: [response.data].concat(this.state.data), dealViewIsOpen: false}))

    onPatch = (deal: Deal) =>
        api.patch('deals', deal)
            .then(response => {
                const restArray = this.state.data.filter(({id}: Deal) => deal.id !== id)

                this.setState({
                    dealViewIsOpen: false,
                    data: [response.data].concat(restArray),
                })
            })

    onDelete = (deal: Deal) =>
        api.get('deals/' + deal.id + '/delete')
            .then(response => {
                const restArray = this.state.data.filter(({id}: Deal) => deal.id !== id)

                this.setState({
                    dealViewIsOpen: false,
                    data: restArray,
                })
            })


    onSelect = (deal: Deal) =>
        this.setState({dealViewIsOpen: true, deal})

    onSuccess = (deal: Deal) =>
        this.state.deal.id
            ? this.onPatch(deal)
            : this.onAdd(deal)

    public render() {
        return (<div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Input

                        placeholder='input search text'
                        value={this.state.search}
                        onChange={this.onSearch}
                    />
                    <Button onClick={this.onRequestAdd}>Добавить</Button>
                </div>
                <DealList
                    data={this.state.data}
                    onRowClick={this.onSelect}
                    onDeleteConfirm={this.onDelete}
                />
                <DealView
                    deal={this.state.deal}
                    onCancel={this.onClose}
                    onSuccess={this.onSuccess}
                    visible={this.state.dealViewIsOpen}
                />
            </div>
        )
    }
}


export default App
