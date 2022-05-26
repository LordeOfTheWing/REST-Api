import { validatePassword } from "../services/user.service";
import { Response, Request } from "express";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { signJWT } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  //Validate the user email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }
  //Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  //Create access token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenTtl") } // 15mins
  );

  //Create refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("refreshTokenTtl") } // 1yr
  );

  //Send refresh and access tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionsHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
