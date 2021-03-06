import { Action } from 'redux'
import { Note, NoteVisibility, Todo } from '../models'
import { NotesState } from '../reducers/notes'

/// Types
export enum NotesActionTypes {
    REINIT_NOTES = 'NotesAction_ReinitNotes',

    ADD_NOTE = 'NotesAction_AddNote',
    CHANGE_NOTE_VISIBILITY = 'NotesAction_ChangeNoteVisibility',

    ADD_TODO = 'NotesAction_AddTodo',
    UPDATE_TODO = 'NotesAction_UpdateTodo'
}

/// Actions
export interface ReinitNotesAction extends Action {
    type: NotesActionTypes.REINIT_NOTES,
    payload: {
        notesState: NotesState
    }
}

export interface AddNoteAction extends Action {
    type: NotesActionTypes.ADD_NOTE,
    payload: {
        note: Note
    }
}

export interface ChangeNoteVisibilityAction extends Action {
    type: NotesActionTypes.CHANGE_NOTE_VISIBILITY,
    payload: {
        id: number,
        visibility: NoteVisibility
    }
}

export interface AddTodoAction extends Action {
    type: NotesActionTypes.ADD_TODO,
    payload: {
        noteId: number,
        todo: Todo
    }
}

export interface UpdateTodoAction extends Action {
    type: NotesActionTypes.UPDATE_TODO,
    payload: {
        noteId: number
        id: number
        done: boolean
        name: string
    }
}

export type NotesAction = ReinitNotesAction | AddNoteAction | ChangeNoteVisibilityAction | AddTodoAction | UpdateTodoAction

/// Action creators
const reinitNotes = (notesState: NotesState): ReinitNotesAction => ({
    type: NotesActionTypes.REINIT_NOTES,
    payload: {
        notesState
    }
})

const addNote = (id: number, name: string): AddNoteAction => {
    return {
        type: NotesActionTypes.ADD_NOTE,
        payload: {
            note: {
                id: id,
                name: name,
                visibility: NoteVisibility.DEFAULT,
                todos: []
            }
        }
    }
}

const changeNoteVisibility = (id: number, visibility: NoteVisibility): ChangeNoteVisibilityAction => {
    return {
        type: NotesActionTypes.CHANGE_NOTE_VISIBILITY,
        payload: {
            id, visibility
        }
    }
}

const addTodo = (id: number, noteId: number, name: string): AddTodoAction => {
    return {
        type: NotesActionTypes.ADD_TODO,
        payload: {
            noteId,
            todo: {
                id: id,
                name: name,
                done: false
            }
        }
    }
}

const updateTodo = (noteId: number, id: number, done: boolean, name: string): UpdateTodoAction => {
    return {
        type: NotesActionTypes.UPDATE_TODO,
        payload: {
            noteId, id, done, name
        }
    }
}

export const notesActions = {
    reinitNotes,
    addNote,
    changeNoteVisibility,
    addTodo,
    updateTodo
}