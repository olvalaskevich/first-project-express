import {client} from "./db";

export type ProductType={
    id:string
    title:string
}
export const productsRepo={
    async findProducts(title:string|undefined):Promise<ProductType[]>{
        if (title){
            return await client.db("shop").collection<ProductType>("products").find({title: {$regex: title}}).toArray()
        }
        else{
            return await client.db("shop").collection<ProductType>("products").find({}).toArray()
        }
    },
    async findProduct(productId):ProductType|undefined{
        return client.db("shop").collection<ProductType>("products").findOne({id:productId})
    },
    async deleteProduct(productId):boolean{
        let result=await client.db("shop").collection<ProductType>("products").deleteOne({id:productId})
        return result.deletedCount===1

    },
    async createProduct(newProduct):ProductType{
        if (newProduct){
            return client.db("shop").collection<ProductType>("products").insertOne(newProduct)
        }
    },
    async updateProduct(productBody):boolean{
        let result= await client.db("shop").collection<ProductType>("products").updateOne({id:productBody.id}, {$set:{title:productBody.title}})
        return result.matchedCount===1
    }
}