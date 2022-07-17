const supplierService = require('../services/supplierService');
const {isInn} = require("../utils/checkInn");

class SupplierController {
    async getSupplier(req, res) {
        try {
            const suppliers = await supplierService.getSuppliers(req.params.subjectId);
            res.status(200).json(suppliers);
        } catch (e) {
            res.status(500).json(`Something went wrong, please try again: ${e}`);
        }
    }

    async create(req, res) {
        try {
            if (!isInn(req.body.inn)) {
                res.status(400).json('invalid inn');
                return;
            }
            const createdRow = await supplierService.create(req.body);
            res.status(201).json(createdRow);
        } catch (e) {
            res.status(500).json(`Something went wrong, please try again: ${e}`);
        }
    }

    async update(req, res) {
        try {
            if (!isInn(req.body.inn)) {
                res.status(400).json('invalid inn');
                return;
            }
            const updatedRow = await supplierService.update(req.body, req.params.rowId);
            res.status(200).json(updatedRow);
        } catch (e) {
            res.status(500).json(`Something went wrong, please try again: ${e}`);
        }
    }

    async remove(req, res) {
        try {
            const removeRow = await supplierService.remove(req.params.rowId);
            res.status(200).json(`Row is deleted, ${removeRow}`);
        } catch (e) {
            res.status(500).json(`Something went wrong, please try again: ${e}`);
        }
    }
}

module.exports = new SupplierController();