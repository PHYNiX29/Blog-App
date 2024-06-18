import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log("aint authenticated");
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

//prcess
export function generateJwtToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15h' });
}

export function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
}

export function authenticateRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token expired or invalid' });
        }
        req.user = user;
        next();
    });
}
