"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adressesRouter = void 0;
const express_1 = require("express");
const adresses_repository_1 = require("../repositiries/adresses-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.adressesRouter = (0, express_1.Router)({});
const valueValidation = (0, express_validator_1.body)('value').trim().isLength({ min: 3, max: 20 }).withMessage('Length should be from 3 to 20 symbols');
exports.adressesRouter.get('/', (req, res) => {
    let params = req.query.value ? toString() : undefined;
    let findAdresses = adresses_repository_1.adressesRepo.findAdresses(params);
    res.send(findAdresses);
});
exports.adressesRouter.get('/:id', (req, res) => {
    let adress = adresses_repository_1.adressesRepo.findAdress(req.params.id);
    if (adress) {
        res.send(adress);
    }
    else {
        res.send(404);
    }
});
exports.adressesRouter.delete('/:adressId', (req, res) => {
    let adress = adresses_repository_1.adressesRepo.deleteAdress(req.params.adressId);
    if (adress) {
        res.send(adress);
    }
    else {
        res.send(404);
    }
});
exports.adressesRouter.post('/', valueValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    let newAdress = adresses_repository_1.adressesRepo.createAdress(req.body);
    if (newAdress)
        res.status(201).send(newAdress);
});
exports.adressesRouter.put('/', valueValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    let adressUpdate = adresses_repository_1.adressesRepo.updateAdress(req.body);
    if (adressUpdate) {
        res.send(adressUpdate);
    }
    else {
        res.send(404);
    }
});
