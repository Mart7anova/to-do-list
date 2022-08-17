import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {fetchTasks} from '../../reducers/task-reducer';

type PropsType = {
    todoListId: string
}

export const Task: FC<PropsType> = (props) => {

    let tasks = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTasks(props.todoListId))
    }, [])

    return (
        <div>
            {tasks[props.todoListId].map(t =>
                <div key={t.id}>
                    {t.title}
                </div>
            )}
        </div>
    );
};
