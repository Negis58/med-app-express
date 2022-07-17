const {Subject} = require("../models/subject.model");
const sequelize = require('../database/config');
const {Op} = require("sequelize");

class SubjectService {
    async getSubjects() {
        return await Subject.findAll({
            where: {
                p00: {
                    [Op.or]: [{[Op.like]: '0%'}, {[Op.like]: '13%'}],
                },
                where: sequelize.where(sequelize.fn('char_length', sequelize.col('p00')), 10)

            }
        });
    }
}

module.exports = new SubjectService();