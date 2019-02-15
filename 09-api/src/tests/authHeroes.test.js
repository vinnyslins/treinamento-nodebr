const assert = require('assert');
const api = require('../api');

const Context = require('../db/strategies/base/contextStrategy');
const Postgres = require('../db/strategies/postgres/postgres');
const UsuarioSchema = require('../db/strategies/postgres/schemas/usuarioSchema');

const USER = {
  username: 'vinnyslins',
  password: '123'
};
const USER_DB = {
  ...USER,
  password: '$2b$04$JJohTfUc5tcUigulGAb0SOjghCgslx9ZR/Jll08WuKuPjLbWj4OKO'
};

let app = {};

describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api;
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, UsuarioSchema);
    const context = new Context(new Postgres(connection, model));
    await context.update(null, USER_DB, true);
  });
  it('Deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER
    });

    const payload = JSON.parse(result.payload);
    assert.equal(result.statusCode, 200);
    assert.ok(payload.token);
  });
  it('Deve retornar unauthorized ao tentar fazer um login incorreto', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'vinnys',
        password: '123'
      }
    });

    const payload = JSON.parse(result.payload);
    assert.equal(result.statusCode, 401);
    assert.deepEqual(payload.error, 'Unauthorized');
  });
});
