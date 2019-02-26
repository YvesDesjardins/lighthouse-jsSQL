const pg = require("pg");
const settings = require("./settings"); // settings.json
const args = process.argv.slice(2);

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching...');
  client.query("SELECT (first_name, last_name, birthdate) FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1;", args, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const arr = querryArray(result);
    outputAsText(arr);
    client.end();
  });
});

const querryArray = (result) => {
  const tempArr = [];
  for (const i in result.rows) {
    const splitText = result.rows[i].row.slice(1, -1).split(',');
    tempArr.push(splitText);
  }

  return tempArr;
}

const outputAsText = (arr) => {
  console.log(`Found ${arr.length} person(s) by the name '${args[0]}'`);
  for (const i in arr) {
    console.log(`  -  ${arr[i][0]} ${arr[i][1]}, born ${arr[i][2]}`);
  }
}
