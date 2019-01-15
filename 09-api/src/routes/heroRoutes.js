const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');

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
          return 'Erro interno no servidor.';
        }
      }
    }
  }

  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
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
          return 'Internal server error';
        }
      }
    }
  }

  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      config: {
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
          if (result.nModified < 1) return {
            message: 'Não foi possível atualizar!'
          };

          return {
            message: 'Herói atualizado com sucesso!'
          };
        } catch(error) {
          console.log(error);
          return 'Internal server error';
        }
      }
    }
  }

  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      config: {
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

          if (result.n < 1) return {
            message: 'Não foi possível remover.'
          };

          return {
            message: 'Herói removido com sucesso!'
          };
        } catch(error) {
          console.log(error);
          return 'Internal server error';
        }
      }
    }
  }
}

module.exports = HeroRoutes;
