import React, {ChangeEvent, FC, useState, KeyboardEvent, memo} from 'react';
import {Button, TextField, withStyles} from '@material-ui/core';
import style from './styles/AddItemForm.module.scss';

type PropsType = {
    addItem: (title: string) => void
    disabled?: boolean
    itemTitle: string
}

export const AddItemForm: FC<PropsType> = memo(({addItem, disabled, itemTitle}) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const addHandler = () => {
        const titleTrim = title.trim()

        if (titleTrim.length > 100) {
            setError('Max length of 100 characters')
        } else if (titleTrim !== '') {
            addItem(titleTrim);
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
            <div className={style.TextFieldContainer}>
                <CssTextField label={error || `Add a new ${itemTitle}`}
                              variant="outlined"
                              value={title}
                              error={!!error}
                              onChange={onChangeHandler}
                              onKeyUp={onKeyUpHandler}
                              fullWidth
                />
            </div>
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
});

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'rgba(0,0,0,0.7)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
                backgroundColor: 'rgba(0,0,0,0.04)',
                borderColor: 'rgba(0,0,0,0.2)'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
            },
        },
    },
})(TextField);