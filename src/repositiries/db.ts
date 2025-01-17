import {MongoClient} from "mongodb"
import {ProductType} from "./products-db-repository";


const mongoUri=process.env.mongoURI || "mongodb://0.0.0.0:27017"

const client=new MongoClient(mongoUri)
export const dbShop=client.db("shop").collection<ProductType>("products")
export async function runDb(){
    try{
        await client.connect();
        await client.db("products").command({ping:1});
        console.log("Connected successfully to mongo server");
    } catch{
        console.log("Error connection");
        await client.close()
    }
}