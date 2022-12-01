import {AddItemForm} from '../common/components/AddItemForm'
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItemFrom',
    component: AddItemForm,
    decorators: [
        (AddItemForm)=>(
        <div style={{width: '300px'}}><AddItemForm/></div>
    )]
}as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

const actions = action('Button inside form clicked, text for add')

export const Base = Template.bind({})
Base.args={
    itemTitle: 'text',
    addItem:actions
}

export const DisableButton = Template.bind({})
DisableButton.args={
    itemTitle: 'text',
    addItem:actions,
    disabled: true
}