import { DataSource } from "typeorm";
import { AppDataSource } from "./data-source";

if (process.env.NODE_ENV === "test") {
  AppDataSource.setOptions({
    host: "localhost",
    database: "rentx_test",
  });
} else {
  AppDataSource.setOptions({
    host: "database_ignite",
  });
}

export { AppDataSource };

export default function getAppDataSource(host = "database_ignite"): DataSource {
  if (process.env.NODE_ENV === "test") {
    AppDataSource.setOptions({
      host: "localhost",
      database: "rentx_test",
    });
  } else {
    AppDataSource.setOptions({
      host,
    });
  }

  return AppDataSource;
}
