import { Router } from 'express'
import * as authCTRL from '../controllers/auth-controller'
import { verifySignup } from '../middlewares'
const router = Router()

router.post('/signin', authCTRL.signIn)

router.post('/signup', [
    verifySignup.checkDuplicateUsernameOrEmail, //valdiar que el username o email no existan en la BD
    verifySignup.checkRolesExisted //validar que los roles que se les asignen a los usuarios existan
], authCTRL.signUp)

export default router