import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'restaurant_secret_jwt_key_2026_super_secure', {
    expiresIn: '30d',
  });
};

export default generateToken;
