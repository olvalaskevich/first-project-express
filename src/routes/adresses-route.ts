import {Request, Response, Router} from "express";

const adresses=[{id:'1', value:'Pobedy'}, {id:'2', value:'Raduznaja'}, {id:'3', value:'Nzavicimosty'}]

export const adressesRouter=Router({})

adressesRouter.get('/', (req:Request, res:Response) => {
    if (req.query.value){
        let resultAdresses=adresses.filter((p)=>p.value.includes(req.query.value.toString()))
        res.send(resultAdresses)
    }
    else{
        res.send(adresses)
    }
})
adressesRouter.get('/:id', (req:Request, res:Response) => {
    let adress=adresses.find((p)=>p.id===req.params.id)
    if (adress){
        res.send(adress.value)
    }
    else {
        res.send(404)
    }

})
adressesRouter.delete('/:adressId', (req:Request, res:Response) => {
    let adress=adresses.find((p)=>p.id===req.params.adressId)
    if (adress){
        let indexAdress=adresses.indexOf(adress)
        adresses.splice(indexAdress,1)
        res.send(adresses)
    }
    else {
        res.send(404)
    }
})
adressesRouter.post('/', (req:Request, res:Response)=>{
        adresses.push(req.body)
        res.status(201).send(req.body)
    })
adressesRouter.put('/', (req:Request, res:Response)=>{
        let adressUpdate=adresses.find((p)=>p.id===req.body.id)
        if (adressUpdate){
            let index=adresses.indexOf(adressUpdate)
            adresses.splice(index,1,req.body)
            res.send(req.body)
        }
        else{
            res.send(404)
        }
    })