import Product from '../models/Product'

export const createProduct = async(req, res) => {
    const { name, category, price, imgUrl } = req.body
    const newProduct = new Product({ name, category, price, imgUrl })
    const productSaved = await newProduct.save()
        //el status 201 indica que un nuevo producto se ha creado
    res.status(201).json(productSaved)
}

export const getProducts = async(req, res) => {
    const products = await Product.find()
    res.json(products)
}

export const getProduct = async(req, res) => {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}

export const updateProduct = async(req, res) => {
    const updatedProd = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updatedProd)
}

export const deleteProduct = async(req, res) => {
    await Product.findByIdAndDelete(req.params.productId)
    res.status(204).json()
}