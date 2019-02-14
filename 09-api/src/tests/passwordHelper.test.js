const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');

const SENHA = 'Vinnys@321';
const HASH = '$2b$04$ES3Er4NFSzssZhGHE520Ru1la0L413zhCpo6MB0uaV28JnNfiVuRi';

describe('Password helper test suite', () => {
  it('Deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    assert.ok(result);
  });
  it('Deve comparar uma senha e seu hash', async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH);
    assert.ok(result);
  });
});
