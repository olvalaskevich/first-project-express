const products=[{id:'1', title:'tomato'}, {id:'2', title:'orange'}, {id:'3', title:'bread'}]

export const productsRepo={
    findProducts(title:string|undefined){
        if (title){
            return products.filter((p) => p.title.includes(title))
        }
        else{
            return products
        }
    },
    findProduct(title){
        return products.find((p)=>p.title===title)
    },
    deleteProduct(productId){
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
    createProduct(newProduct){
        if (newProduct){
            products.push(newProduct)
            return newProduct
        }
    },
    updateProduct(productBody){
        let productUpdate=products.find((p)=>p.id===productBody.id)
        if (productUpdate){
            let index=products.indexOf(productUpdate)
            products.splice(index,1,productBody)
            return products[index]
        }
    }
}