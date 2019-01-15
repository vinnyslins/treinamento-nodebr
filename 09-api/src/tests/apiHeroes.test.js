const assert = require('assert');
const api = require('../api');

const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Biônica'
};
const MOCK_HEROI_ATUALIZAR = {
  nome: 'Gavião Negro',
  poder: 'Mira'
};

let MOCK_ID = '';
let app = {};

describe('Suíte de testes da API Heroes', function() {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      payload: MOCK_HEROI_ATUALIZAR
    });
    MOCK_ID = JSON.parse(result.payload)._id;
  });
  it('Listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois'
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });
  it('Listar /herois - deve retornar somente 3 registros', async () => {
    const LIMIT = 3;
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${LIMIT}`
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === LIMIT);
  });
  it('Listar /herois - deve retornar um erro com limit incorreto', async () => {
    const LIMIT = 'a';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${LIMIT}`
    });

    assert.equal(result.statusCode, 400);
  });
  it('Listar /herois - deve filtrar pelo nome', async () => {
    const NAME = 'Batman';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=10&nome=${NAME}`
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.deepEqual(dados[0].nome, NAME);
  });
  it('Cadastrar /herois', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      payload: MOCK_HEROI_CADASTRAR
    });

    const { _id, message } = JSON.parse(result.payload);
    assert.equal(result.statusCode, 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, 'Herói cadastrado com sucesso!');
  });
  it('Atualizar /herois/:id', async () => {
    const expected = { poder: 'Supermira' };
    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${MOCK_ID}`,
      payload: expected
    });
    const dados = JSON.parse(result.payload);

    assert.equal(result.statusCode, 200);
    assert.deepEqual(dados.message, 'Herói atualizado com sucesso!');
  });
  it('Atualizar /herois/:id - deve retornar um erro com _id incorreto', async () => {
    const _id = '5c3d60551f8e0460db6ba1e8';
    const expected = { poder: 'Supermira' };
    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      payload: expected
    });
    const dados = JSON.parse(result.payload);

    assert.equal(result.statusCode, 200);
    assert.deepEqual(dados.message, 'Não foi possível atualizar!');
  });
});
