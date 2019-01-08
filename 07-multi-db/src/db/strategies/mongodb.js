const ICrud = require('./interfaces/interfaceCrud');
const Mongoose = require('mongoose');

const STATUS = {
  0: 'Desconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectando'
}

class MongoDB extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state !== 'Conectando') return state;
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    return STATUS[this._driver.readyState];
  }

  connect() {
    Mongoose.connect('mongodb://vinnyslins:my-secret-pw@localhost:27017/heroes', {
      useNewUrlParser: true
    }, error => {
      if (!error) return;
      console.log('Falha na conexão');
    });

    this._driver = Mongoose.connection;
    this._driver.once('open', () => {
      console.log('Database rodando!', this._driver.readyState);
    });
    this.defineModel();
  }

  defineModel() {
    const heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    });
    this._herois = Mongoose.model('herois', heroiSchema);
  }

  create(item) {
    return this._herois.create(item);
  }
}

module.exports = MongoDB;
