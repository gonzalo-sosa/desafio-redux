import config from 'config';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware para verificar la autenticación
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header Authorization

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token, config.jwtSecret, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = decoded; // Agregar la información del usuario decodificada al objeto de la solicitud
    next(); // Continuar con la siguiente ruta/middleware
  });
};

export default authMiddleware;
