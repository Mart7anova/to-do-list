import React, {FC} from 'react';
import {EditableSpan} from '../components/EditableSpan';
import {TaskType} from '../api/api';
import {ModelType} from '../reducers/task-reducer';

type PropsType = {
    task: TaskType
    changeTaskTitle: (taskId: string, changes: ModelType) => void
}

export const Task: FC<PropsType> = (props) => {
    const {
        task,
        changeTaskTitle
    } = props

    const onChangeTitle = (value: string) => {
        changeTaskTitle(task.id, {title: value})
    }

    return (
        <div key={task.id}>
            <EditableSpan value={task.title} onChange={onChangeTitle}/>
        </div>
    );
};
