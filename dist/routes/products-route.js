"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_db_repository_1 = require("../repositiries/products-db-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.productsRouter = (0, express_1.Router)();
const titleValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 3, max: 20 }).withMessage('Length should be from 3 to 20 symbols');
exports.productsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let title = req.query.title ? toString() : undefined;
    let findProducts = yield products_db_repository_1.productsRepo.findProducts(title);
    res.send(findProducts);
}));
exports.productsRouter.get('/:product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield products_db_repository_1.productsRepo.findProduct(req.params.product);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
exports.productsRouter.delete('/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = products_db_repository_1.productsRepo.deleteProduct(req.params.productId);
    if (product) {
        res.send(200);
    }
    else {
        res.send(404);
    }
}));
exports.productsRouter.post('/', titleValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newProduct = yield products_db_repository_1.productsRepo.createProduct(req.body);
    if (newProduct)
        res.status(201).send(newProduct);
}));
exports.productsRouter.put('/', titleValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productUpdate = products_db_repository_1.productsRepo.updateProduct(req.body);
    if (productUpdate) {
        res.send(200);
    }
}));
