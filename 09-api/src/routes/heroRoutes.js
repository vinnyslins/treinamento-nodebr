const BaseRoute = require('./base/baseRoute');

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      handler: (request, headers) => {
        try {
          const { skip, limit, nome } = request.query;
          const query = nome ? { nome } : {};

          if (skip && isNaN(skip))
            throw Error('O tipo do skip é incorreto.');
          if (limit && isNaN(limit))
            throw Error('O tipo do limit é incorreto.');

          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch(error) {
          console.log(error);
          return 'Erro interno no servidor.';
        }
      }
    }
  }
}

module.exports = HeroRoutes;
