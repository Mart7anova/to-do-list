import {TextField, Tooltip} from '@material-ui/core';
import React, {ChangeEvent, FC, memo, useEffect, useState} from 'react';
import style from './EditableSpan.module.scss'

type PropsType = {
    value: string
    onChange: (value: string) => void
}

export const EditableSpan: FC<PropsType> = memo((props) => {
    const [value, setValue] = useState(props.value)
    const [editMode, setEditMode] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    const activeEditMode = () => {
        setEditMode(true)
    }

    const deactivatedEditMode = () => {
        setEditMode(false)
        props.onChange(value)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <div>
            {editMode
                ? <TextField className={style.inputContainer}
                             defaultValue={value}
                             onChange={onChangeHandler}
                             onBlur={deactivatedEditMode}
                             autoFocus
                             onKeyUp={e => e.key === 'Enter' && deactivatedEditMode()}
                />
                : <Tooltip title={'use double-click to edit'}>
                    <span className={style.textContainer} onDoubleClick={activeEditMode}>{props.value}</span>
                </Tooltip>
            }
        </div>
    );
});

