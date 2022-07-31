import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import getDataSource from "@shared/infra/typeorm";

async function create() {
  const id = uuidV4();
  const password = await hash("admin", 8);

  const AppDataSource = await getDataSource();

  await AppDataSource.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
    VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'XXX-XXXX', true, now())`,
  );

  AppDataSource.destroy();
}

create().then(() => console.log("Created admin"));
