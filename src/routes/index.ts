import Router from 'express'
import awsRouter from '@modules/aws/aws.routes'

const router = Router()

router.use('/api/aws', awsRouter)

export default router
