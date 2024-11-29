import {Request, Response, Router} from "express";
import {adressesRepo} from "../repositiries/adresses-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const adressesRouter=Router({})
const valueValidation=body('value').trim().isLength({min:3, max:20}).withMessage('Length should be from 3 to 20 symbols')

adressesRouter.get('/', (req:Request, res:Response) => {
    let params=req.query.value?toString():undefined;
    let findAdresses=adressesRepo.findAdresses(params)
    res.send(findAdresses)
})
adressesRouter.get('/:id', (req:Request, res:Response) => {
    let adress=adressesRepo.findAdress(req.params.id)
    if (adress){
        res.send(adress)
    }
    else{
        res.send(404)
    }
})
adressesRouter.delete('/:adressId', (req:Request, res:Response) => {
    let adress=adressesRepo.deleteAdress(req.params.adressId)
    if (adress){
        res.send(adress)
    }
    else {
        res.send(404)
    }
})
adressesRouter.post('/',
    valueValidation,
    inputValidationMiddleware,
    (req:Request, res:Response)=>{
    let newAdress=adressesRepo.createAdress(req.body)
    if (newAdress)
        res.status(201).send(newAdress)
    })
adressesRouter.put('/',
    valueValidation,
    inputValidationMiddleware,
    (req:Request, res:Response)=>{
    let adressUpdate=adressesRepo.updateAdress(req.body)
    if (adressUpdate){
        res.send(adressUpdate)
    }
    else{
        res.send(404)
    }
    })