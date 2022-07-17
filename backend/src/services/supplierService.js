const {Supplier} = require('../models/supplier.model');

class SupplierService {
    async getSuppliers(id) {
        return await Supplier.findAll({where: {r1022: id}})
    }

    async create(body) {
        return await Supplier.create({
            npp: body.npp,
            naim_org: body.naim_org,
            adr_fact: body.adr_fact,
            inn: body.inn,
            plazma_max: body.plazma_max,
            plazma_cena: body.plazma_cena,
            erm_max: body.erm_max,
            erm_cena: body.erm_cena,
            immg_max: body.immg_max,
            immg_cena: body.immg_cena,
            alb_max: body.alb_max,
            alb_cena: body.alb_cena,
            r1022: body.r1022,
        })
    }

    async update(data, id) {
        return await Supplier.update(
            {...data}, {where: {id: id}, returning: true}
        );
    }

    async remove(id) {
        return await Supplier.destroy({where: {id: id}});
    }
}

module.exports = new SupplierService();