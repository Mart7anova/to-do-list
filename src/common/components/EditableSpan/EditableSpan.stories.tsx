import {EditableSpan} from './EditableSpan';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';

export default {
    title: 'EditableSpan',
    component: EditableSpan,
}as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />

const actions = action('modified text:')

export const Base = Template.bind({})
Base.args={
    value:'some text',
    onChange:actions
}