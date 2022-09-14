import {ComponentMeta} from '@storybook/react';
import {NavigationBar} from '../components/NavigationBar';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {ProgressLine} from '../components/common/ProgressLine';

export default {
    title: 'NavigationBar',
    component: NavigationBar,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof NavigationBar>

export const Base = () => <NavigationBar/>
export const NavBarWithProgressLine = () => <><NavigationBar/><ProgressLine/></>


