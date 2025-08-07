import request from "supertest";
import express from "express";
import productRoutes from "../../../src/routes/product.routes";

const app = express();
app.use(express.json());
app.use("/products", productRoutes);

describe("Product Routes", () => {
  it("POST /products → debe fallar si el payload es inválido", async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "", price: -1 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
