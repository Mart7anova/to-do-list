import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../main/Task';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/api';

export default {
    title: 'Task',
    component: Task,
}as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

const changeActions = action('Task changed')
const removeActions = action('Task deleted')
const task: TaskType={
    id: '1',
    todoListId: 'one',
    title: 'some text',
    status: TaskStatuses.Completed,
    priority: TaskPriorities.Middle,
    description: '',
    addedDate: '22.04.2022',
    startDate: '22.04.2022',
    deadline: '22.04.2222',
    order: -1
}

export const Base = Template.bind({})
Base.args={
    task,
    changeTask: changeActions,
    removeTask: removeActions
}
