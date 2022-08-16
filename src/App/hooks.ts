import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppStateType} from './store';

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
