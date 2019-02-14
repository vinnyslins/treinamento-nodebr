const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');

const failAction = (request, headers, error) => {
  throw error;
};

const USER = {
  username: 'vinnyslins',
  password: '123456'
};

class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super();
    this.secret = secret;
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Obter token',
        notes: 'Fazer login com usuário e senha',
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
          }
        }
      },
      handler: request => {
        const { username, password } = request.payload;
        if (username.toLowerCase() !== USER.username || password !== USER.password) {
          return Boom.unauthorized();
        }

        const token = Jwt.sign({
          username,
          id: 1
        }, this.secret);
        return { token };
      }
    }
  }
}

module.exports = AuthRoutes;
