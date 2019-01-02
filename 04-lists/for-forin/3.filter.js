const { obterPessoas } = require('./service');

async function main() {
  try {
    const { results } = await obterPessoas('a');

    const familiaLars = results.filter(item => {
      return item.name.toLowerCase().indexOf('lars') !== -1;
    });

    const names = familiaLars.map(pessoa => pessoa.name);

    console.log(names);
  } catch(error) {
    console.error(error);
  }
}

main();
