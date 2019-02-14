const assert = require('assert');
const api = require('../api');

let app = {};

describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api;
  });
  it('Deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'vinnyslins',
        password: '123456'
      }
    });

    const payload = JSON.parse(result.payload);
    assert.equal(result.statusCode, 200);
    assert.ok(payload.token);
  });
});
