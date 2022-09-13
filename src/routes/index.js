var express = require('express');
var router = express.Router();
let validator = require('../validations/validator');
const {validationResult} = require('express-validator');
let cookieCheck = require('../validations/cookie');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.userLogin) {
    return res.render('bienvenida', {
      title: 'Express',
      dato: req.session.userLogin,
    });
  } else {
    return res.render('index', {title: 'Express'});
  }
});

router.get('/Deslogueo', cookieCheck, function (req, res) {
  req.session.destroy();
  res.cookie('cookie', null, {maxAge: -1});
  return res.redirect('/');
});

router.post('/Color', cookieCheck, function (req, res) {
  let oldData = req.session.userLogin;
  req.session.userLogin = {
    nombre: oldData.nombre,
    edad: oldData.edad,
    email: oldData.email,
  };

  req.cookies.cookie = {
    nombre: oldData.nombre,
    edad: oldData.edad,
    email: oldData.email,
  };

  return res.render('bienvenida', {
    title: 'Express',
    dato: req.session.userLogin,
  });
});

router.post('/', validator, cookieCheck, function (req, res, next) {
  const errores = validationResult(req);
  if (errores.isEmpty()) {
    req.session.userLogin = {
      nombre: req.body.nombre,
      color: req.body.colors,
      edad: req.body.edad,
      email: req.body.email.trim(),
    };
    if (req.body.remember) {
      res.cookie('cookie', req.session.userLogin, {maxAge: 1000 * 60 * 10});
    }
    return res.render('bienvenida', {
      title: 'Express',
      dato: req.session.userLogin,
    });
  } else {
    return res.render('index', {errores: errores.array(), old: req.body, title: 'Express'});
  }
});
router.get('/gracias', function (req, res) {
  return res.render('gracias', {dato: req.session.userLogin});
});

module.exports = router;
