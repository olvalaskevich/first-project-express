import {Request, Response, Router} from "express";
import {productsRepo} from "../repositiries/products-db-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const productsRouter=Router()
const titleValidation=body('title').trim().isLength({min:3, max:20}).withMessage('Length should be from 3 to 20 symbols')
productsRouter.get('/', async (req:Request, res:Response) => {
    let title=req.query.title?toString():undefined;
    let findProducts=await productsRepo.findProducts(title)
    res.send(findProducts)
})
productsRouter.get('/:product', async (req:Request, res:Response) => {
    let product=await productsRepo.findProduct(req.params.product)
    if (product){
        res.send(product)
    }
    else{
        res.send(404)
    }

})
productsRouter.delete('/:productId', async (req:Request, res:Response) => {
    let product= productsRepo.deleteProduct(req.params.productId)
    if (product){
        res.send(200)
    }
    else {
        res.send(404)
    }
})
productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    async (req:any, res:any)=>{
            let newProduct=await productsRepo.createProduct(req.body)
            if (newProduct)
                res.status(201).send(newProduct)
    })
productsRouter.put('/',
    titleValidation,
    inputValidationMiddleware,
    async (req:any, res:any)=>{
            let productUpdate=productsRepo.updateProduct(req.body)
            if (productUpdate){
                res.send(200)
            }
    })