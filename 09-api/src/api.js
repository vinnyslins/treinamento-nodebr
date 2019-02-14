const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

const HapiJwt = require('hapi-auth-jwt2');

const JWT_SECRET = 'TASMANIAN_DEVIL@333';

const app = new Hapi.Server({
  port: 5000
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroiSchema));

  await app.register([HapiJwt, Inert, Vision, {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'API Heroes | #CursoNodeBR',
        version: 'v1.0',
      },
      lang: 'pt'
    }
  }]);

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    validate: (payload, request) => {
      // Verifica se o usuário existe e se está ativo
      return { isValid: true };
    }
  });
  app.auth.default('jwt');

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
  ]);

  await app.start();
  console.log('Servidor rodando na porta', app.info.port);

  return app;
}

module.exports = main();
