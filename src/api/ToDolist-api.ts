import axios from 'axios';
import {LoginParamsType, ResponseTasksType, TodoListType, ResponseType, MeType, TaskType, UpdateTaskModelType} from './types';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'd4e06bbb-2142-48c2-be24-68df57142f14'
    }
})

export const authAPI = {
    me(){
        return instance.get<ResponseType<MeType>>(`/auth/me`)
    },
    login(data: LoginParamsType){
        return instance.post<ResponseType<{userId: number}>>(`/auth/login`, data)
    },
    logout(){
        return instance.delete<ResponseType>(`/auth/login`)
    }
}

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`/todo-lists`, {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string){
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}

export const taskAPI = {
    getTasks(todoListId: string){
        return instance.get<ResponseTasksType>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string){
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string){
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
    }
}



