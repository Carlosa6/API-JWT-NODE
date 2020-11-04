import { Router } from 'express'
import * as productCTRL from '../controllers/products-controller'
import { verifyToken } from '../middlewares'
const router = Router()

router.post('/', verifyToken, productCTRL.createProduct)

router.get('/', productCTRL.getProducts)

router.get('/:productId', productCTRL.getProduct)

router.put('/:productId', verifyToken, productCTRL.updateProduct)

router.delete('/:productId', verifyToken, productCTRL.deleteProduct)

export default router