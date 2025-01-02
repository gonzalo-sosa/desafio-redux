import config from 'config';
import type { JwtPayload } from 'jsonwebtoken';

export class AuthController {
  async generateToken(payload: JwtPayload, expiresIn?: string) {
    const module = await import('jsonwebtoken');
    const token = module.sign(payload, config.jwtSecret, {
      expiresIn,
      algorithm: 'HS256',
    });

    return token;
  }

  async checkToken(token: string) {
    const module = await import('jsonwebtoken');
    const decoded = module.verify(token, config.jwtSecret);

    return decoded as JwtPayload;
  }
}
