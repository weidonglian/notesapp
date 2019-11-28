import { getRepository } from 'typeorm'
import { Response, Request } from 'express'
import { getUserFromRequest } from '../../util/user'
import { Note } from '../../entity/Note'
import { checkNotEmpty } from '../../validator'
import { HttpStatusCode } from '../../util/httpErrors'
import { transformAndValidate } from 'class-transformer-validator'

export class NotesController {

    static postNotes = async (req: Request, res: Response) => {
        const user = await getUserFromRequest(req, res)
        const note = await transformAndValidate(Note, req.body as object)
        note.user = user
        const notesRepo = getRepository(Note)
        await notesRepo.save(note)
        res.send(note)
    }

    static getNotes = async (req: Request, res: Response) => {
        //Get users from database
        const user = await getUserFromRequest(req, res)
        const notesRepo = getRepository(Note)
        const notes = await notesRepo.find({
            where: {
                user: user
            },
            relations: [
                'todos'
            ]
        })
        //Send the users object
        res.send(notes)
    }

    static putNotes = async (req: Request, res: Response) => {
        const id = req.params.id
        checkNotEmpty(id, 'parameter id empty or not found')
        const { name } = req.body
        checkNotEmpty(name, 'the property name not found or empty')
        const noteRepo = getRepository(Note)
        const note = await noteRepo.findOneOrFail(id)
        note.name = name
        await noteRepo.save(note)
        res.send(note)
    }

    static deleteNotes = async (req: Request, res: Response) => {
        const id = req.params.id
        checkNotEmpty(id, 'parameter id empty or not found')
        const noteRepo = getRepository(Note)
        await noteRepo.delete(id)
        res.status(HttpStatusCode.Success)
    }


}