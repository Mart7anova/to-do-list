import {PageNotFound} from './PageNotFound'
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'PageNotFound',
    component: PageNotFound,
}as ComponentMeta<typeof PageNotFound>

const Template: ComponentStory<typeof PageNotFound> = () => <PageNotFound />

export const Base = Template.bind({})
