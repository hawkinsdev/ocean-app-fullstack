import { create } from "../../../src/controllers/product.controller";
import { Request, Response } from "express";

describe("Product Controller", () => {
  it("should return 400 if name or price are invalid", async () => {
    const req = {
      body: { name: "", price: -5 },
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    await create(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: "Nombre requerido y precio debe ser mayor a 0",
    });
  });
});
