"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositiries/products-repository");
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.get('/', (req, res) => {
    let params = req.query.title ? toString() : undefined;
    let findProducts = products_repository_1.productsRepo.findProducts(params);
    res.send(findProducts);
});
exports.productsRouter.get('/:product', (req, res) => {
    let product = products_repository_1.productsRepo.findProduct(req.params.product);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.delete('/:productId', (req, res) => {
    let product = products_repository_1.productsRepo.deleteProduct(req.params.productId);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.post('/', (req, res) => {
    let newProduct = products_repository_1.productsRepo.createProduct(req.body);
    if (newProduct)
        res.status(201).send(newProduct);
});
exports.productsRouter.put('/', (req, res) => {
    let productUpdate = products_repository_1.productsRepo.updateProduct(req.body);
    if (productUpdate) {
        res.send(productUpdate);
    }
    else {
        res.send(404);
    }
});
