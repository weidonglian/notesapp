import { Route } from '../../util/index'
import { checkJwt } from '../../validator'
import { NotesController } from './NotesController'

const routes: Route[] = [
    {
        path: '/notes',
        method: 'get',
        handler: [
            checkJwt,
            NotesController.getNotes
        ]
    }
]

export default routes