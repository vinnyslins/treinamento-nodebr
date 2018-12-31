const EventEmitter = require('events');

class MeuEmissor extends EventEmitter {
}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click';

meuEmissor.on(nomeEvento, click => {
  console.log('um usuário clicou', click);
});

meuEmissor.emit(nomeEvento, 'na barra de rolagem');
meuEmissor.emit(nomeEvento, 'no ok');

const stdin = process.openStdin();
stdin.addListener('data', value => {
  console.log('você digitou', value.toString().trim());
});

// let count = 0;
// setInterval(() => {
//   meuEmissor.emit(nomeEvento, 'no ok' + count++);
// }, 1000);
