import React, {ChangeEvent, FC, memo} from 'react';
import {EditableSpan} from '../components/EditableSpan';
import {TaskStatuses, TaskType} from '../api/api';
import {ModelType} from '../store/reducers/task-reducer';
import {Checkbox, Grid, withStyles} from '@material-ui/core';
import {CheckCircleOutline, RadioButtonUnchecked} from '@material-ui/icons';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import style from './styles/Task.module.scss'
import {green} from '@material-ui/core/colors';

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
        <Grid key={task.id} container direction={'row'} alignItems={'center'} className={style.taskContainer}>
            <Checkbox icon={<RadioButtonUnchecked/>}
                      checkedIcon={<GreenCheckbox/>}
                      color={'default'}
                      size={'medium'}
                      checked={task.status === TaskStatuses.Completed}
                      onChange={onChangeStatus}
            />
            <EditableSpan value={task.title} onChange={onChangeTitle}/>
            <Checkbox icon={<HighlightOffRoundedIcon/>}
                      onClick={removeHandler}
                      size={'medium'}
                      color={'default'}
            />
</Grid>
)
    ;
});

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        'input:hover ~ &': {
            backgroundColor: 'none'
        }
    }
})(CheckCircleOutline)
