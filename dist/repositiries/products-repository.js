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
exports.productsRepo = void 0;
const products = [{ id: '1', title: 'tomato' }, { id: '2', title: 'orange' }, { id: '3', title: 'bread' }];
exports.productsRepo = {
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                return products.filter((p) => p.title.includes(title));
            }
            else {
                return products;
            }
        });
    },
    findProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return products.find((p) => p.title === title);
        });
    },
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = products.find((p) => p.id === productId);
            if (product) {
                let indexProduct = products.indexOf(product);
                products.splice(indexProduct, 1);
                return products;
            }
            else {
                return product;
            }
        });
    },
    createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newProduct) {
                products.push(newProduct);
                return newProduct;
            }
        });
    },
    updateProduct(productBody) {
        return __awaiter(this, void 0, void 0, function* () {
            let productUpdate = products.find((p) => p.id === productBody.id);
            if (productUpdate) {
                let index = products.indexOf(productUpdate);
                products.splice(index, 1, productBody);
                return products[index];
            }
        });
    }
};
