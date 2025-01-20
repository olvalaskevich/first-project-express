import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-route";
import {runDb} from "./repositiries/db";



const app = express()
const port = process.env.PORT || 5000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use('/products', productsRouter)
// app.use('/adresses', adressesRouter)

const startApp=async ()=>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()


