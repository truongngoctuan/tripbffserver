const {
  init,
  create,
  database,
  config,
  up,
  down,
  status
} = require('migrate-mongo');

const { db, client } = await database.connect();
await client.close();

const migrated = await up(db, client);
migrated.forEach(fileName => console.log('Migrated:', fileName));

// todo migrate s3 data. likely to be syncing folders (icons, emotions)