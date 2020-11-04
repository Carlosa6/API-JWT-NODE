import { Router } from 'express'
import * as productCTRL from '../controllers/products-controller'
const router = Router()

router.post('/', productCTRL.createProduct)

router.get('/', productCTRL.getProducts)

router.get('/:productId', productCTRL.getProduct)

router.put('/:productId', productCTRL.updateProduct)

router.delete('/:productId', productCTRL.deleteProduct)

export default router