/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { downloadSingleFile, getAllFiles, getSingleFile, uploadFile } from './aws.controller'

const router = Router()

router.get('/upload', getAllFiles)
router.get('/upload/:fileName', getSingleFile)
router.get('/download/:fileName', downloadSingleFile)
router.post('/upload', uploadFile)
// router.post('/upload', subirRecurso)

export default router
