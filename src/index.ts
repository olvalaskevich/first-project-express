import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 5000

const products=[{id:'1', title:'tomato'}, {id:'2', title:'orange'}, {id:'3', title:'bread'}]
const adresses=[{id:'1', value:'Pobedy'}, {id:'2', value:'Raduznaja'}, {id:'3', value:'Nzavicimosty'}]

const parserMiddleware=bodyParser({})
app.use(parserMiddleware)


// get-запросы products
app.get('/products', (req:Request, res:Response) => {
    if (req.query.title){
        let resultProducts=products.filter((p)=>p.title.includes(req.query.title.toString()))
        res.send(resultProducts)
    }
    else{
        res.send(products)
    }

})
app.get('/products/:product', (req:Request, res:Response) => {
    let product=products.find((p)=>p.title===req.params.product)
    if (product){
        res.send(product)
    }
    else{
        res.send(404)
    }

})

// get-запросы adresses
app.get('/adresses', (req:Request, res:Response) => {
    if (req.query.value){
        let resultAdresses=adresses.filter((p)=>p.value.includes(req.query.value.toString()))
        res.send(resultAdresses)
    }
    else{
        res.send(adresses)
    }
})
app.get('/adresses/:id', (req:Request, res:Response) => {
    let adress=adresses.find((p)=>p.id===req.params.id)
    if (adress){
        res.send(adress.value)
    }
    else {
        res.send(404)
    }

})

// delete-запросы products & adresses
app.delete('/products/:productId', (req:Request, res:Response) => {
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
app.delete('/adresses/:adressId', (req:Request, res:Response) => {
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

// post-запросы products & adresses
app.post('/products', (req:Request, res:Response)=>{
    products.push(req.body)
    res.status(201).send(req.body)
    }
)
app.post('/adresses', (req:Request, res:Response)=>{
        adresses.push(req.body)
        res.status(201).send(req.body)
    }
)

// put-запросы products & adresses
app.put('/products', (req:Request, res:Response)=>{
    let productUpdate=products.find((p)=>p.id===req.body.id)
    if (productUpdate){
        let index=products.indexOf(productUpdate)
        products.splice(index,1,req.body)
        res.send(req.body)
    }
    else{
        res.send(404)
    }
    }
)
app.put('/adresses', (req:Request, res:Response)=>{
        let adressUpdate=adresses.find((p)=>p.id===req.body.id)
        if (adressUpdate){
            let index=adresses.indexOf(adressUpdate)
            adresses.splice(index,1,req.body)
            res.send(req.body)
        }
        else{
            res.send(404)
        }
    }
)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})