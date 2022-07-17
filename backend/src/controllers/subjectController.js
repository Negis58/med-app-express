const subjectService = require('../services/subjectService');

class SubjectController {
    async getSubjects(req, res) {
        try {
            const subjects = await subjectService.getSubjects();
            res.status(200).json(subjects);
        } catch (e) {
            res.status(500).json(`Something went wrong, please try again: ${e}`);
        }
    }
}

module.exports = new SubjectController();