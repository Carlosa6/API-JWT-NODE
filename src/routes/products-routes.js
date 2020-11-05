import { Router } from 'express'
import * as productCTRL from '../controllers/products-controller'
import { authJwt } from '../middlewares'
const router = Router()

//PARA QUE EL USUARIO PUEDA CREAR UN PRODUCTO,
//PRIMERO DEBE TENER UN TOKEN , LUEGO VERIFICAR EL ROL DE MODERADOR
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productCTRL.createProduct)

router.get('/', productCTRL.getProducts)

router.get('/:productId', productCTRL.getProduct)

//PARA QUE EL USUARIO PUEDA ACTUALIZAR UN PRODUCTO,
//PRIMERO DEBE TENER UN TOKEN , LUEGO VERIFICAR EL ROL DE ADMIN
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productCTRL.updateProduct)

//PARA QUE EL USUARIO PUEDA ELIMINAR UN PRODUCTO,
//PRIMERO DEBE TENER UN TOKEN , LUEGO VERIFICAR EL ROL DE ADMIN
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productCTRL.deleteProduct)

export default router