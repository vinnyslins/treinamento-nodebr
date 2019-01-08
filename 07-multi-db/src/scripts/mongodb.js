/*
sudo docker exec -it mongodb \
  mongo -u vinnyslins -p my-secret-pw --authenticationDatabase heroes

show dbs
use heroes

show collections
*/

for (let i = 0; i <= 10000; i++) {
  db.herois.insert({
    nome: `Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1999-01-01'
  });
}

db.herois.find();
db.herois.find().pretty();
db.herois.findOne();
db.herois.count();
db.herois.find().limit(10).sort({ nome: -1 });
db.herois.find({}, { poder: 1, _id: 0 });

// CREATE
db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1999-01-01'
});

// READ
db.herois.find();

// UPDATE
db.herois.update({ _id: ObjectId('5c3426eb3efaee09530969b1') }, { $set: { nome: 'Lanterna Verde' }});
db.herois.update({ poder: 'Velocidade' }, { $set: { poder: 'Força' }});

// DELETE
db.herois.remove({ nome: 'Mulher Maravilha' });
