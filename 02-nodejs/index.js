function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '11999999',
      ddd: 11
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    });
  }, 2000);
}

obterUsuario((erro, usuario) => {
  if (erro) {
    console.error('deu ruim no usuário', erro);
    return;
  }
  obterTelefone(usuario.id, (erro1, telefone) => {
    if (erro1) {
      console.error('deu ruim no telefone', erro1);
      return;
    }
    obterEndereco(usuario.id, (erro2, endereco) => {
      if (erro2) {
        console.error('deu ruim no endereço', erro2);
        return;
      }

      console.log(`
        Nome: ${usuario.nome},
        Endereço: ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `);
    });
  });
});
