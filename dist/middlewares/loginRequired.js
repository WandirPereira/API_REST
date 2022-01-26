"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Loquin required!'],
    });
  }

  const [, token] = authorization.split(' ');
  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Caso o usuário seja deletado, ou faça Update de campos chave (não pode!!!),
    // Até o usuário realizar o logoff, ele continuará com o dasdos válidos.
    // verifica no banco, a cada requisição< se as informações do usuário são válidas.
    // Na minha opnião, não usar,
    // pois perde o sentido usar o JWT se teremos que ir ao banco a cada requisição.
    // Não permitir a ediução de dos chaves.
    // Não permitir a exclusão do cadastro do usuário. Apenas inativar.

    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido!'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
