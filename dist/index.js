"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const products = [{ id: '1', title: 'tomato' }, { id: '2', title: 'orange' }, { id: '3', title: 'bread' }];
const adresses = [{ id: '1', value: 'Pobedy' }, { id: '2', value: 'Raduznaja' }, { id: '3', value: 'Nzavicimosty' }];
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
// get-запросы
app.get('/products', (req, res) => {
    if (req.query.title) {
        let resultProducts = products.filter((p) => p.title.includes(req.query.title.toString()));
        res.send(resultProducts);
    }
    else {
        res.send(products);
    }
});
app.get('/products/:product', (req, res) => {
    let product = products.find((p) => p.title === req.params.product);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.get('/adresses', (req, res) => {
    res.send(adresses);
});
app.get('/adresses/:id', (req, res) => {
    let adress = adresses.find((p) => p.id === req.params.id);
    if (adress) {
        res.send(adress.value);
    }
    else {
        res.send(404);
    }
});
// delete-запросы
app.delete('/products/:productId', (req, res) => {
    let product = products.find((p) => p.id === req.params.productId);
    if (product) {
        let indexProduct = products.indexOf(product);
        products.splice(indexProduct, 1);
        res.send(products);
    }
    else {
        res.send(404);
    }
});
// post-запросы
app.post('/products', (req, res) => {
    products.push(req.body);
    res.status(201).send(req.body);
});
// put-запросы
app.put('/products', (req, res) => {
    let productUpdate = products.find((p) => p.id === req.body.id);
    if (productUpdate) {
        let index = products.indexOf(productUpdate);
        products.splice(index, 1, req.body);
        res.send(req.body);
    }
    else {
        res.send(404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});