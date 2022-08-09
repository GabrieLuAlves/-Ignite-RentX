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

  it("should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({
        email: "admin@rentx.com.br",
        password: "admin",
      })
      .expect(200);

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category if another one with the same name already exists", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({
        email: "admin@rentx.com.br",
        password: "admin",
      })
      .expect(200);

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category already exists!");
  });
});
