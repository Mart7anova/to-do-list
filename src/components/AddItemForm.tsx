import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {Button, TextField} from '@material-ui/core';
import style from './AddItemForm.module.scss';

type PropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: FC<PropsType> = ({addItem, disabled}) => {
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const addHandler = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Enter') {
            addHandler();
        }
    }

    return (
        <div className={style.addItemFromContainer}>
            <TextField label={error || 'Title'}
                       variant="outlined"
                       value={title}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyUpHandler}
            />
            <Button className={style.addButton}
                    variant={'outlined'}
                    color={'default'}
                    disableElevation
                    size={'small'}
                    onClick={addHandler}
                    disabled={disabled || !!error}
            >
                <p>+</p>
            </Button>
        </div>
    );
};
