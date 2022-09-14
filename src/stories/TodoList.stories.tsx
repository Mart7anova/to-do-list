import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {TodoList} from '../components/TodoList';
import {Paper} from '@material-ui/core';


export default {
    title: 'TodoList',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodoList>

const Template: ComponentStory<typeof TodoList> = (args) => <Paper
    style={{width: '300px', padding: '20px'}}><TodoList {...args}/></Paper>

export const Base = Template.bind({})
Base.args = {
    todoList: {id: 'todolistId3', title: 'Some text', filter: 'all', addedDate: '', order: -2}
}

export const TodolistWithTasks = Template.bind({})
TodolistWithTasks.args = {
    todoList: {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0}
}