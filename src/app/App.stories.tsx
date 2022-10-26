import {ComponentMeta} from '@storybook/react';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import App from './App';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, withRouter]
} as ComponentMeta<typeof App>

export const AppToDoList = () => <App/>
