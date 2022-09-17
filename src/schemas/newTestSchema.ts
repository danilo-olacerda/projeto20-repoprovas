import joi from 'joi';

const newTestSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required()
});

export default newTestSchema;