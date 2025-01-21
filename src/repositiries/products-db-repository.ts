import {dbShop} from "./db";
import {InsertOneResult} from "mongodb";

export type ProductType={
    id:string
    title:string
}

export const productsRepo={
    async findProducts(title:string|undefined):Promise<ProductType[]>{
        if (title){
            return await dbShop.find({title: {$regex: title}}).toArray()
        }
        else{
            return await dbShop.find({}).toArray()
        }
    },
    async findProduct(productId):ProductType|undefined{
        return await dbShop.findOne({id:productId})
    },
    async deleteProduct(productId):Promise<boolean>{
        let result=await dbShop.deleteOne({id:productId})
        return result.deletedCount===1

    },
    async createProduct(newProduct):Promise<InsertOneResult<ProductType>>{
        if (newProduct){
            return dbShop.insertOne(newProduct)
        }
    },
    async updateProduct(productBody):Promise<boolean>{
        let result= await dbShop.updateOne({id:productBody.id}, {$set:{title:productBody.title}})
        return result.matchedCount===1
    }
}