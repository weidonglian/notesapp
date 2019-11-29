import { TkDispatch } from '../utils/redux-utils'
import { apiClient } from '../services/request'
import { notesActions } from './notes'
import { plainToClass } from 'class-transformer'
import { Note } from '../models'

const reinitNotes = () => async (dispatch: TkDispatch) => {
    // TODO Move the code to login actions
    const respLogin = await apiClient.post('/auth/login', {
        username: 'dev',
        password: 'dev'
    })
    const { token } = respLogin.data
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const resp = await apiClient.get('/notes')
    const notes = plainToClass(Note, resp.data as object[])
    console.log(notes)
    dispatch(notesActions.reinitNotes({notes}))
}

const addNote = (name: string) => async (dispatch: TkDispatch) => {
    // first add it to server and then add to actual note
    const resp = await apiClient.post('/notes', { name })
    dispatch(notesActions.addNote(resp.data.id, resp.data.name))
}

const addTodo = (noteId: number, name: string) => async (dispatch: TkDispatch) => {
    const resp = await apiClient.post('/todos', { noteId, name })
    console.log(resp.data)
    dispatch(notesActions.addTodo(resp.data.id, resp.data.noteId, resp.data.name))
}

const updateTodoName = (id: number, name: string) => async (dispatch: TkDispatch) => {
    const resp = await apiClient.put(`/todos/${id}`, { name })
    dispatch(notesActions.updateTodo(resp.data.todoId, resp.data.noteId, resp.data.done, resp.data.name))
}

const toggleTodo = (id: number) => async (dispatch: TkDispatch) => {
    const resp = await apiClient.put(`/todos/${id}/toggle_done`)
    dispatch(notesActions.updateTodo(resp.data.todoId, resp.data.noteId, resp.data.done, resp.data.name))
}

export const notesReqActions = {
    reinitNotes,
    addNote,
    addTodo,
    updateTodoName,
    toggleTodo
}