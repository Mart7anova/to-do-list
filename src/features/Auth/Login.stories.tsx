import {Login} from './Login'
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from '../../app/decorators/ReduxStoreProviderDecorator';
import {withRouter} from 'storybook-addon-react-router-v6';

export default {
    title: 'Login',
    component: Login,
    decorators:[ReduxStoreProviderDecorator, withRouter]
}as ComponentMeta<typeof Login>

const Template: ComponentStory<typeof Login> = () => <Login demo={true}/>

export const Base = Template.bind({})
