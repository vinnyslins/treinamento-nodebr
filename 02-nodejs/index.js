const util = require('util');

const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        telefone: '11999999',
        ddd: 11
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    });
  }, 2000);
}

async function main() {
  try {
    const usuario = await obterUsuario();
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ]);
    const telefone = resultado[0];
    const endereco = resultado[1];

    console.log(`
      Nome: ${usuario.nome}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereço: ${endereco.rua}, ${endereco.numero}
    `);
  } catch (erro) {
    console.error('deu ruim', erro);
  }
}

main();

// const usuarioPromise = obterUsuario();
// usuarioPromise.then(usuario => {
//   return obterTelefone(usuario.id).then(resultado => {
//     return {
//       usuario: {
//         nome: usuario.nome,
//         id: usuario.id
//       },
//       telefone: resultado
//     }
//   });
// }).then(resultado => {
//   const endereco = obterEnderecoAsync(resultado.usuario.id);
//   return endereco.then((result) => {
//     return {
//       usuario: resultado.usuario,
//       telefone: resultado.telefone,
//       endereco: result
//     }
//   });
// }).then(resultado => {
//   console.log(`
//     Nome: ${resultado.usuario.nome}
//     Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//     Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//   `);
// }).catch(erro => {
//   console.error('deu ruim', erro);
// });

// obterUsuario((erro, usuario) => {
//   if (erro) {
//     console.error('deu ruim no usuário', erro);
//     return;
//   }
//   obterTelefone(usuario.id, (erro1, telefone) => {
//     if (erro1) {
//       console.error('deu ruim no telefone', erro1);
//       return;
//     }
//     obterEndereco(usuario.id, (erro2, endereco) => {
//       if (erro2) {
//         console.error('deu ruim no endereço', erro2);
//         return;
//       }

//       console.log(`
//         Nome: ${usuario.nome},
//         Endereço: ${endereco.rua}, ${endereco.numero}
//         Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `);
//     });
//   });
// });
