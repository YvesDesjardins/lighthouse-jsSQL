const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'yves',
    password: '',
    database: 'test_db'
  }
});
const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});
const args = process.argv.slice(2);

const addPerson = (args) => {
  knex('famous_people').insert({
      first_name: args[0],
      last_name: args[1],
      birthdate: new Date(args[2])
    })
    .returning('*')
    .then((res) => {
      outputText(res);
    })
    .catch((err) => {
      throw err;
    })
    .finally(function () {
      knex.destroy();
    });
}

const outputText = (arr) => {
  console.log(`Added ${arr.length} person`);
  for (const i in arr) {
    console.log(`  -  ${arr[i].first_name} ${arr[i].last_name}, born ${arr[i].birthdate}`);
  }
}

const runProgram = (args) => {
  let arr = addPerson(args);
}

runProgram(args);
