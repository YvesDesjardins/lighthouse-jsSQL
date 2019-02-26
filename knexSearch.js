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

const searchPerson = (name) => {
  knex.select('*').from('famous_people').where('first_name', 'LIKE', 'name').orWhere('last_name', 'LIKE', 'name')
    .then((res) => {
      outputText(res);
    })
    .catch((err) => {
      throw err;
    }).finally(function () {
      knex.destroy();
    });
}

const listTable = () => {
  knex.select('*').from('famous_people')
    .then((res) => {
      outputText(res);
    })
    .catch((err) => {
      throw err;
    }).finally(function () {
      knex.destroy();
    });
}

const outputText = (arr) => {
  console.log(`Found ${arr.length} person(s) by the name '${args[0]}'`);
  for (const i in arr) {
    console.log(`  -  ${arr[i].first_name} ${arr[i].last_name}, born ${arr[i].birthdate}`);
  }
}

const runProgram = (args) => {
  if (args[0]) {
    searchPerson(args[0]);
  } else {
    listTable();
  }
}

runProgram(args);
