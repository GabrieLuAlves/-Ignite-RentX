import { app } from "@shared/infra/http/app";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import request from "supertest";

import { AppDataSource } from "@shared/infra/typeorm";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    const id = uuid();
    const password = await hash("admin", 8);

    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    await AppDataSource.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
    VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'XXX-XXXX', true, now())`,
    );
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({
        email: "admin@rentx.com.br",
        password: "admin",
      })
      .expect(200);

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});
