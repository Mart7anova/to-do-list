import React, {ChangeEvent, FC} from 'react';
import {EditableSpan} from '../components/EditableSpan';
import {TaskStatuses, TaskType} from '../api/api';
import {ModelType} from '../reducers/task-reducer';
import {Checkbox, IconButton, Tooltip} from '@material-ui/core';
import {CheckCircleOutline, HighlightOff, RadioButtonUnchecked} from '@material-ui/icons';

type PropsType = {
    task: TaskType
    changeTask: (taskId: string, changes: ModelType) => void
    removeTask: (taskId: string) => void
}

export const Task: FC<PropsType> = (props) => {
    const {
        task,
        changeTask,
        removeTask
    } = props

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked
        changeTask(task.id, newStatus ? {status: TaskStatuses.Completed} : {status: TaskStatuses.New})
    }

    const onChangeTitle = (value: string) => {
        changeTask(task.id, {title: value})
    }

    const removeHandler = () => {
        removeTask(task.id)
    }

    return (
        <div key={task.id}>
            <Tooltip title="Checked">
                <Checkbox icon={<RadioButtonUnchecked/>}
                          checkedIcon={<CheckCircleOutline/>}
                          color={'primary'}
                          checked={task.status === TaskStatuses.Completed}
                          onChange={onChangeStatus}
                />
            </Tooltip>
            <EditableSpan value={task.title} onChange={onChangeTitle}/>

            <Tooltip title="Delete">
                <IconButton aria-label="delete"
                            onClick={removeHandler}
                >
                    <HighlightOff/>
                </IconButton>
            </Tooltip>
        </div>
    );
};
