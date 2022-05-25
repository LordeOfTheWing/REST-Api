import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUserInput } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import log from '../utils/logger';

export async function createUserHandler(
  req: Request<{}, {}, createUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}
