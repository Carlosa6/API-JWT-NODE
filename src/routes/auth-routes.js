import { Router } from 'express'
import * as authCTRL from '../controllers/auth-controller'
const router = Router()

router.post('/signin', authCTRL.signIn)

router.post('/signup', authCTRL.signUp)

export default router