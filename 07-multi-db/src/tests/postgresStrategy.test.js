const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());

describe('Postgres strategy', function () {
  this.timeout(Infinity);
  it('PostgreSQL Connection', async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });
});
