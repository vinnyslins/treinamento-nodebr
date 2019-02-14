const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');

const failAction = (request, headers, error) => {
  throw error;
};

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      config: {
        tags: ['api'],
        description: 'Deve listar heróis',
        notes: 'Pode paginar resultados e filtrar por nome',
        validate: {
          failAction,
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100)
          }
        }
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, nome } = request.query;
          const query = nome ? {
            nome: { $regex: `.*${nome}.*` }
          } : {};

          return this.db.read(query, skip, limit);
        } catch(error) {
          console.log(error);
          return Boom.internal();
        }
      }
    }
  }

  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
        tags: ['api'],
        description: 'Deve cadastrar um herói',
        notes: 'Deve cadastrar um herói com nome e poder',
        validate: {
          failAction,
          payload: {
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(2).max(20)
          }
        }
      },
      handler: async request => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          return {
            _id: result._id,
            message: 'Herói cadastrado com sucesso!'
          };
        } catch(error) {
          console.log(error);
          return Boom.internal();
        }
      }
    }
  }

  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      config: {
        tags: ['api'],
        description: 'Deve atualizar um herói por id',
        notes: 'Pode atualizar qualquer campo',
        validate: {
          failAction,
          params: {
            id: Joi.string().required()
          },
          payload: {
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(2).max(20)
          }
        }
      },
      handler: async request => {
        try {
          const { id } = request.params;
          const { payload } = request;

          const dados = JSON.parse(JSON.stringify(payload));

          const result = await this.db.update(id, dados);
          if (result.nModified < 1)
            return Boom.preconditionFailed('Id não encontrado.');

          return {
            message: 'Herói atualizado com sucesso!'
          };
        } catch(error) {
          console.log(error);
          return Boom.internal();
        }
      }
    }
  }

  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      config: {
        tags: ['api'],
        description: 'Deve remover um herói por id',
        notes: 'O id tem que ser válido',
        validate: {
          failAction,
          params: {
            id: Joi.string().required()
          }
        }
      },
      handler: async request => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);

          if (result.n < 1)
            return Boom.preconditionFailed('Não foi possível remover.');

          return {
            message: 'Herói removido com sucesso!'
          };
        } catch(error) {
          console.log(error);
          return Boom.internal();
        }
      }
    }
  }
}

module.exports = HeroRoutes;
