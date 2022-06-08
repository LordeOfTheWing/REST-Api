import supertest from "supertest";
import { app } from "../app";

describe("product", () => {
  describe("get product route", () => {
    describe("given the product does not exist ", () => {
      it("should return a 404", async () => {
        const productId = "product-12345";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });
  });
});

describe("given the product exists ", () => {
  it("should return a 404", async () => {
    const productId = "product_idjdo89tzbefe20b1z0nhje";
    await supertest(app).get(`/api/products/${productId}`).expect(200);
  });
});
