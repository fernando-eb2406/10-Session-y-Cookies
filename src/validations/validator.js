const {body} = require('express-validator');

module.exports = [
  body('nombre').notEmpty().withMessage('Por favor, ingresa tu nombre.'),
  body('colors').notEmpty().withMessage('Por favor, ingresa tu color.'),
  body('email').notEmpty().withMessage('Por favor, ingresa tu mail.'),
  body('edad')
    .notEmpty()
    .withMessage('Por favor, ingresa tu edad.')
    .isNumeric()
    .withMessage('Ingrese un valor numerico')
    .bail(),
];
