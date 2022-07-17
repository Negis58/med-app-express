const sequelize = require('../database/config');
const {DataTypes} = require("sequelize");
const {Supplier} = require("./supplier.model");

const Subject = sequelize.define('r1022', {
    p00: {type: DataTypes.STRING(11), allowNull: false, primaryKey: true},
    p01: {type: DataTypes.STRING(500)},
    utv: {type: DataTypes.STRING(1), defaultValue: 0, allowNull: false},
    p02: {type: DataTypes.STRING(500)},
    sp: {type: DataTypes.STRING(1), defaultValue: 0}
}, {timestamps: false, tableName: 'r1022', schema: 'public'});


// Subject.hasMany(Supplier);
Supplier.belongsTo(Subject, {foreignKey: 'r1022', as: 'R1022', onDelete: 'cascade', onUpdate: 'cascade'});

module.exports = {Subject};
