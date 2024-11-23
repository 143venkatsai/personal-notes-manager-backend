const Joi = require("joi");

const validateNote = (req, res, next) =>{
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().valid("Work", "Personal", "Others").default("Others"),
        completed: Joi.boolean().default(false),
    });

    const {error} = schema.validate(req.body);
    if (error){
        return res.status(400).send({message: error.details[0].message});
    }
    next();
}

module.exports = validateNote;