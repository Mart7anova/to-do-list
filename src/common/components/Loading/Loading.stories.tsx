import {ComponentMeta} from '@storybook/react';
import {Loading} from './Loading';


export default {
    title: 'Loading',
    component: Loading,
} as ComponentMeta<typeof Loading>

export const Base = () => <Loading/>
