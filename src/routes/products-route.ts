import {Request, Response, Router} from "express";
import {productsRepo} from "../repositiries/products-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const productsRouter=Router()
const titleValidation=body('title').trim().isLength({min:3, max:20}).withMessage('Length should be from 3 to 20 symbols')
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
productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    (req:any, res:any)=>{
            let newProduct=productsRepo.createProduct(req.body)
            if (newProduct)
                res.status(201).send(newProduct)
    })
productsRouter.put('/',
    titleValidation,
    inputValidationMiddleware,
    (req:any, res:any)=>{
            let productUpdate=productsRepo.updateProduct(req.body)
            if (productUpdate){
                res.send(productUpdate)
            }
    })