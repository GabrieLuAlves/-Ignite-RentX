import { DataSource } from "typeorm";
import { AppDataSource } from "./data-source";

AppDataSource.setOptions({
  host: "database_ignite",
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch(err => {
    console.log("Error when connecting to database. See details below.");
    console.log(err);
  });

export { AppDataSource };

export default async function getDataSource(
  host = "database_ignite",
): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    AppDataSource.setOptions({
      host,
    });

    try {
      await AppDataSource.initialize();
      console.log("Database connection successful!");
    } catch (err) {
      console.log("Error when connecting to database. See details below.");
      console.log(err);
    }
  }

  return AppDataSource;
}
