const products=[{id:'1', title:'tomato'}, {id:'2', title:'orange'}, {id:'3', title:'bread'}]
export type ProductType={
    id:string
    title:string
}
export const productsRepo={
    async findProducts(title:string|undefined):ProductType[]{
        if (title){
            return products.filter((p) => p.title.includes(title))
        }
        else{
            return products
        }
    },
    async findProduct(title):ProductType|undefined{
        return products.find((p)=>p.title===title)
    },
    async deleteProduct(productId):ProductType[]|ProductType|undefined{
        let product= products.find((p)=>p.id===productId)
        if (product){
            let indexProduct=products.indexOf(product)
            products.splice(indexProduct,1)
            return products
        }
        else {
            return product
        }
    },
    async createProduct(newProduct):ProductType{
        if (newProduct){
            products.push(newProduct)
            return newProduct
        }
    },
    async updateProduct(productBody):ProductType{
        let productUpdate=products.find((p)=>p.id===productBody.id)
        if (productUpdate){
            let index=products.indexOf(productUpdate)
            products.splice(index,1,productBody)
            return products[index]
        }
    }
}