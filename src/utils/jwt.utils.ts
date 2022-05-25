import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, `${process.env.PRIVATE_KEY}`, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, `${process.env.PUBLIC_KEY}`);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
