import iassign from 'immutable-assign'
import { NotesAction, NotesActionTypes } from '../actions/notes'
import { Note } from '../models'

/// state definition
export interface NotesState {
    notes: Note[]
}

/// init state
export const initialNotesState: NotesState = {
    //notes: ['First Note', 'Second Note', 'Third Note'].map((name, id) => notesActions.addNote(id, name).payload.note)
    notes: []
}

/// reducer
export const notesReducer = (state: NotesState = initialNotesState, action: NotesAction): NotesState => {
    switch (action.type) {
        case NotesActionTypes.REINIT_NOTES: {
            return action.payload.notesState
        }

        case NotesActionTypes.ADD_TODO: {
            const { noteId, todo } = action.payload
            const noteIndex = state.notes.findIndex(note => note.id === noteId)
            if (noteIndex === -1) {
                return state
            } else {
                return iassign(state,
                    s => s.notes[noteIndex].todos,
                    t => [...t, todo]
                )
            }
        }

        case NotesActionTypes.UPDATE_TODO: {
            const { noteId, id } = action.payload
            const noteIndex = state.notes.findIndex(note => note.id === noteId)
            const todoIndex = state.notes[noteIndex].todos.findIndex(todo => todo.id === id)
            return iassign(state,
                s => s.notes[noteIndex].todos[todoIndex],
                t => {
                    t.done = !t.done
                    return t
                }
            )
        }

        case NotesActionTypes.ADD_NOTE: {
            const { note } = action.payload
            return iassign(state,
                s => s.notes,
                n => {
                    n.push(note)
                    return n
                }
            )
        }

        case NotesActionTypes.CHANGE_NOTE_VISIBILITY: {
            const { id, visibility } = action.payload
            const noteIndex = state.notes.findIndex(note => note.id === id)
            if (noteIndex === -1) {
                return state
            } else {
                return iassign(state,
                    s => s.notes[noteIndex],
                    n => {
                        n.visibility = visibility
                        return n
                    }
                )
            }
        }

        default:
            return state
    }
}