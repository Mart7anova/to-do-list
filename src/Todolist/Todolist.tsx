import React, {useEffect} from 'react';
import {fetchTodolists} from './todolist-reducer';
import {useAppDispatch, useAppSelector} from '../App/hooks';

export const Todolist = () => {
    const todolist = useAppSelector(state => state.todolist)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTodolists())
    },[])

    return (
        <div>
            {todolist.map(t=><div key={t.id}>
                {t.title}
            </div>)}
        </div>
    );
};
