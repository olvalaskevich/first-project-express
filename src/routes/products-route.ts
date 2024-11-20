import {Request, Response, Router} from "express";
import {productsRepo} from "../repositiries/products-repository";


export const productsRouter=Router()

productsRouter.get('/', (req:Request, res:Response) => {
    let params=req.query.title?toString():undefined;
    let findProducts=productsRepo.findProducts(params)
    res.send(findProducts)
})
productsRouter.get('/:product', (req:Request, res:Response) => {
    let product=productsRepo.findProduct(req.params.product)
    if (product){
        res.send(product)
    }
    else{
        res.send(404)
    }

})
productsRouter.delete('/:productId', (req:Request, res:Response) => {
    let product=productsRepo.deleteProduct(req.params.productId)
    if (product){
        res.send(product)
    }
    else {
        res.send(404)
    }
})
productsRouter.post('/', (req:Request, res:Response)=>{
    let newProduct=productsRepo.createProduct(req.body)
    if (newProduct)
        res.status(201).send(newProduct)
    })
productsRouter.put('/', (req:Request, res:Response)=>{
        let productUpdate=productsRepo.updateProduct(req.body)
        if (productUpdate){
            res.send(productUpdate)
        }
        else{
            res.send(404)
        }
    })