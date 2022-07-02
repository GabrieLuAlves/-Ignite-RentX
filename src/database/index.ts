import { AppDataSource } from './data-source';

AppDataSource.setOptions({
  host: 'database_ignite',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch(err => {
    console.log('Error when connecting to database. See details below.');
    console.log(err);
  });
