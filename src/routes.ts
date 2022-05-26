import {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "./schemas/product.schema";
import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  deleteSessionsHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middlewares/requireUser";
import validateRequest from "./middlewares/validateRequest";
import { createSessionSchema } from "./schemas/session.schema";
import { createUserSchema } from "./schemas/user.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controllers/product.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);

    //Register user --- POST /api/user
    app.post(
      "/api/users",
      validateRequest(createUserSchema),
      createUserHandler
    );

    // Login-- - POST /api/sessions;
    app.post(
      "/api/sessions",
      validateRequest(createSessionSchema),
      createUserSessionHandler
    );
    //Get the user's sessions GET -- /api/sessions
    app.get("/api/sessions", requireUser, getUserSessionsHandler);

    //Logout --- DELETE /api/sessions
    app.delete("/api/sessions", requireUser, deleteSessionsHandler);

    //Create product POST -- /api/products

    app.post(
      "/api/products",
      [requireUser, validateRequest(createProductSchema)],
      createProductHandler
    );

    //Update product PUT -- /api/products/:productId
    app.put(
      "/api/products/:productId",
      [requireUser, validateRequest(updateProductSchema)],
      updateProductHandler
    );

    //Get Product GET -- /api/products

    app.get(
      "/api/products/:productId",
      validateRequest(getProductSchema),
      getProductHandler
    );

    //Delete Products DELETE -- /api/products/:productId
    app.delete(
      "/api/products/:productId",
      [requireUser, validateRequest(deleteProductSchema)],
      deleteProductHandler
    );
  });
}
