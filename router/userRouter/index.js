const express = require('express');
const { User } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
var BCRYPT_SALT_ROUND = 12;

router.post('/register', async (req, res) => {
  const {firstname, lastname, occupation, email, password} = req.body;
  const userSignin = await User.findOne({
    where: {correo: req.body.email}
  });  
  if(!userSignin){
    bcrypt.hash(password, BCRYPT_SALT_ROUND).then(hashedPassword => {
      var userData = {
        nombres: escape(firstname),
        apellidos: escape(lastname),
        correo: escape(email),
        contrasenia: hashedPassword,
        ocupacion: occupation
      };
      const userSignedUp = User.create(userData);
      if(userSignedUp){
        res.status(201).send({msg: "Usuario creado correctamente", code: 201});
      }
      else{
        res.status(500).send({msg: "Ocurrió un error al crear el usuario", code: 500});
      }
    })
  }
  else{
    res.status(409).send({msg: "El usuario ya se encuentra registrado", code: 409});
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const userRegister = await User.findOne({
    where: {correo: email}
  });

  if(userRegister){
    bcrypt.compare(password, userRegister.contrasenia).then(samePassword => {
      if(samePassword){
        var token = jwt.sign({id: userRegister.id, email: userRegister.email}, "SomethingSecret", {expiresIn: 86400});
        res.status(202).send({msg: "Usuario logeado correctamente", code: 202, data: userRegister, accessToken: token});
      }
      else{
        res.status(401).send({msg: "Email o contraseña inválidos", code: 401});
      }
    });
  }
  else{
    res.status(404).send({msg: "El usuario no se encuentra registrado", code: 404});
  }
});

module.exports = router;
