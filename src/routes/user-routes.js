import { Router } from 'express'
import * as userCTRL from '../controllers/user-controller'
import { authJwt, verifySignup } from '../middlewares'
const router = Router()

router.post('/', [
    authJwt.verifyToken, //verifica que se le pase el token
    authJwt.isAdmin, //verifica que el usuario tenga el rol admin
    verifySignup.checkRolesExisted //verifica que los roles que se le asignen al nuevo usuario existan
], userCTRL.createUser)

export default router