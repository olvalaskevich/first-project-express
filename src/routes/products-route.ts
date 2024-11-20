import {Request, Response, Router} from "express";

const products=[{id:'1', title:'tomato'}, {id:'2', title:'orange'}, {id:'3', title:'bread'}]

export const productsRouter=Router()

productsRouter.get('/', (req:Request, res:Response) => {
    if (req.query.title){
        let resultProducts=products.filter((p)=>p.title.includes(req.query.title.toString()))
        res.send(resultProducts)
    }
    else{
        res.send(products)
    }

})
productsRouter.get('/:product', (req:Request, res:Response) => {
    let product=products.find((p)=>p.title===req.params.product)
    if (product){
        res.send(product)
    }
    else{
        res.send(404)
    }

})
productsRouter.delete('/:productId', (req:Request, res:Response) => {
    let product=products.find((p)=>p.id===req.params.productId)
    if (product){
        let indexProduct=products.indexOf(product)
        products.splice(indexProduct,1)
        res.send(products)
    }
    else {
        res.send(404)
    }
})
productsRouter.post('/', (req:Request, res:Response)=>{
        products.push(req.body)
        res.status(201).send(req.body)
    })
productsRouter.put('/', (req:Request, res:Response)=>{
        let productUpdate=products.find((p)=>p.id===req.body.id)
        if (productUpdate){
            let index=products.indexOf(productUpdate)
            products.splice(index,1,req.body)
            res.send(req.body)
        }
        else{
            res.send(404)
        }
    })