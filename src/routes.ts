import { Express, Request, Response } from 'express';
import { createUserSessionHandler } from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import validateRequest from './middlewares/validateRequest';
import { createSessionSchema } from './schemas/session.schema';
import { createUserSchema } from './schemas/user.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);

    //Register user --- POST /api/user
    app.post(
      '/api/users',
      validateRequest(createUserSchema),
      createUserHandler
    );

    // Login-- - POST /api/sessions;
    app.post(
      '/api/sessions',
      validateRequest(createSessionSchema),
      createUserSessionHandler
    );

    //Get the user's sessions GET -- /api/sessions

    //Logout --- DELETE /api/sessions
  });
}
