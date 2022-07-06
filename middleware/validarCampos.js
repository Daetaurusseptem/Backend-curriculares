const { response } = require('express');
const { validationResult } = require('express-validator');


exports.validarCampos = (req, resp = response, next) => {

    errors = validationResult(req);

    if (!errors.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();

}
