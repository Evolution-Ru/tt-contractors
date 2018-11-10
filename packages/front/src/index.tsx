import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// @ts-ignore
import { AppContainer } from 'react-hot-loader'


export const isAppRendered = () => true
const rootElement = document.getElementById('root')

export const render = (Component: any) =>
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>
        , rootElement
    )

render(App)

declare const module: any
if (module.hot)
    module.hot.accept('./App', () => {
        render(App)
    })

registerServiceWorker()
