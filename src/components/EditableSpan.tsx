import {TextField} from '@material-ui/core';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';

type PropsType = {
    value: string
    onChange: (value: string) => void
}

export const EditableSpan: FC<PropsType> = (props) => {
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

    useEffect(()=>{
        setValue(props.value)
    }, [props.value])

    return (
        <div>
            {editMode
                ? <TextField id="standard-basic"
                             defaultValue={value}
                             onChange={onChangeHandler}
                             onBlur={deactivatedEditMode}
                             onKeyUp={e=>e.key === 'Enter' && deactivatedEditMode()}/>
                : <span onDoubleClick={activeEditMode}>{props.value}</span>
            }
        </div>
    );
};

