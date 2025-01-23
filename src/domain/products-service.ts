import {dbShop} from "../repositiries/db";
import {productsRepo} from "../repositiries/products-db-repository";
import {InsertOneResult} from "mongodb";


export type ProductType={
    id:string
    title:string
}

export const productsService={
    async findProducts(title:string|undefined):Promise<ProductType[]>{
        return productsRepo.findProducts(title)
    },
    async findProduct(productId):Promise<ProductType|undefined>{
        return productsRepo.findProduct(productId)
    },
    async deleteProduct(productId):Promise<boolean>{
        return productsRepo.deleteProduct(productId)
    },
    async createProduct(newProduct):Promise<InsertOneResult<ProductType>>{
        return productsRepo.createProduct(newProduct)
    },
    async updateProduct(productBody):Promise<boolean>{
        return productsRepo.updateProduct(productBody)
    }
}