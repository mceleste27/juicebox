const {
  client,
  getAllUsers, // new
  createUser,
} = require("./index");

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
    });
    const sandra = await ({ username: 'sandra', password: 'glamgal' });

    console.log(albert);

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS users;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}
//   const { rows } = await client.query(`SELECT * FROM users;`);
//   console.log(rows);
// } catch (error) {
//   console.error(error);
// } finally {
//   client.end();
// }

// const { create } = require('domain');

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(225) NOT NULL
      );
      `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }

  async function rebuildDB() {
    try {
      client.connect();

      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      throw error;
      // } finally {
      //   client.end();
      // }
    }
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

// client.connect = connects the client to the database
// queries are promises, so we have to await them
// client.end = remember to always close out of client connection
