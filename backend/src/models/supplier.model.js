const sequelize = require('../database/config');
const {DataTypes} = require("sequelize");

const Supplier = sequelize.define('mpe1gem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    npp: {type: DataTypes.INTEGER},
    naim_org: {type: DataTypes.STRING(1000)},
    adr_fact: {type: DataTypes.STRING(1000)},
    inn: {type: DataTypes.STRING(100)},
    plazma_max: {type: DataTypes.FLOAT(17, 6)},
    plazma_cena: {type: DataTypes.FLOAT(17, 6)},
    erm_max: {type: DataTypes.FLOAT(17, 6)},
    erm_cena: {type: DataTypes.FLOAT(17, 6)},
    immg_max: {type: DataTypes.FLOAT(17, 6)},
    immg_cena: {type: DataTypes.FLOAT(17, 6)},
    alb_max: {type: DataTypes.FLOAT(17, 6)},
    alb_cena: {type: DataTypes.FLOAT(17, 6)},
}, {timestamps: false, schema: 'minzdrav', tableName: 'mpe1gem'});


module.exports = {Supplier};