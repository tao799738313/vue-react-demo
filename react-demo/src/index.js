import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <div>
                <Component/>
            </div>
        </AppContainer>,
        document.getElementById('root')
    );
}

render(App)
//
if (module.hot) {
    module.hot.accept('./App', () => {
        render(App)
    })
}
