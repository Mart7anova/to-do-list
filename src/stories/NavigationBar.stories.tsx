import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NavigationBar} from '../main/NavigationBar';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';

export default {
    title: 'NavigationBar',
    component: NavigationBar,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof NavigationBar>

const Template: ComponentStory<typeof NavigationBar> = () => <NavigationBar/>

export const Base = Template.bind({})


