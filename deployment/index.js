const {
  init,
  create,
  database,
  config,
  up,
  down,
  status
} = require('migrate-mongo');

await config.read();
const { db, client } = await database.connect();

const migrated = await up(db, client);
await client.close();

migrated.forEach(fileName => console.log('Migrated:', fileName));

// todo migrate s3 data. likely to be syncing folders (icons, emotions)