const Mongoose = require('mongoose');

Mongoose.connect('mongodb://vinnyslins:my-secret-pw@localhost:27017/heroes', {
  useNewUrlParser: true
}, error => {
  if (!error) return;
  console.log('Falha na conexão');
});

const connection = Mongoose.connection;
connection.once('open', () => {
  console.log('Database rodando!', connection.readyState);
});

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
const model = Mongoose.model('herois', heroiSchema);

async function main() {
  const result = await model.create({
    nome: 'Batman',
    poder: 'Dinheiro'
  });
  console.log(result);

  const list = await model.find();
  console.log(list);
}

main();
