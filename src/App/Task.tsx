import React, {ChangeEvent, FC, memo} from 'react';
import {EditableSpan} from '../components/EditableSpan';
import {TaskStatuses, TaskType} from '../api/api';
import {ModelType} from '../reducers/task-reducer';
import {Checkbox, Grid, IconButton} from '@material-ui/core';
import {CheckCircleOutline, RadioButtonUnchecked} from '@material-ui/icons';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

type PropsType = {
    task: TaskType
    changeTask: (taskId: string, changes: ModelType) => void
    removeTask: (taskId: string) => void
}

export const Task: FC<PropsType> = memo((props) => {
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
        <Grid key={task.id} container direction={'row'} alignItems={'center'} style={{marginTop: '10px'}}>
            <Checkbox icon={<RadioButtonUnchecked/>}
                      checkedIcon={<CheckCircleOutline color={'action'}/>}
                      color={'default'}
                      size={'medium'}
                      checked={task.status === TaskStatuses.Completed}
                      onChange={onChangeStatus}
            />
            <EditableSpan value={task.title} onChange={onChangeTitle}/>
            <IconButton aria-label="delete"
                        onClick={removeHandler}
                        size={'medium'}
            >
                <HighlightOffRoundedIcon/>
            </IconButton>
        </Grid>
    );
});
