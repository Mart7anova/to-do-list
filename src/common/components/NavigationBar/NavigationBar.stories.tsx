import {ComponentMeta} from '@storybook/react';
import {NavigationBar} from './NavigationBar';
import {ReduxStoreProviderDecorator} from '../../../app/decorators/ReduxStoreProviderDecorator';
import {ProgressLine} from '../ProgressLine/ProgressLine';

export default {
    title: 'NavigationBar',
    component: NavigationBar,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof NavigationBar>

export const Base = () => <NavigationBar/>
export const NavBarWithProgressLine = () => <><NavigationBar/><ProgressLine/></>


