import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from '../../app/decorators/ReduxStoreProviderDecorator';
import {TodoListItem} from './ToDoListItem/TodoListItem';
import {Paper} from '@material-ui/core';


export default {
    title: 'TodoList',
    component: TodoListItem,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodoListItem>

const Template: ComponentStory<typeof TodoListItem> = (args) => <Paper
    style={{width: '300px', padding: '20px'}}><TodoListItem {...args}/></Paper>

export const Base = Template.bind({})
Base.args = {
    todoList: {id: 'todolistId3', title: 'Some text', filter: 'all', addedDate: '', order: -2}
}

export const TodolistWithTasks = Template.bind({})
TodolistWithTasks.args = {
    todoList: {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0}
}