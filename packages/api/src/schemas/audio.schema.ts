import Joi from 'joi';

export const AudioSchema = Joi.object({
    url: Joi.string().required(),
    shazamApiKey: Joi.string().allow(null, ''),
    start: Joi.string().allow(null, ''),
    end: Joi.string().allow(null, ''),
})
    .required()
    .meta({ className: 'Audio' });
