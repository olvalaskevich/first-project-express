import {Request, Response, Router} from "express";
import {adressesRepo} from "../repositiries/adresses-repository";


export const adressesRouter=Router({})

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
adressesRouter.post('/', (req:Request, res:Response)=>{
    let newAdress=adressesRepo.createAdress(req.body)
    if (newAdress)
        res.status(201).send(newAdress)
    })
adressesRouter.put('/', (req:Request, res:Response)=>{
    let adressUpdate=adressesRepo.updateAdress(req.body)
    if (adressUpdate){
        res.send(adressUpdate)
    }
    else{
        res.send(404)
    }
    })