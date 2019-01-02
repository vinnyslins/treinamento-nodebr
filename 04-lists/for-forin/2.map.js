const service = require('./service');

async function main() {
  try {
    const results = await service.obterPessoas('a');

    // const names = [];
    // results.results.forEach(item => {
    //   names.push(item.name);
    // });

    const names = results.results.map(item => item.name);

    console.log(names);
  } catch (error) {
    console.error(error);
  }
}

main();
