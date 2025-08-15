const { auth } = require('express-openid-connect');
const jwt = require('jsonwebtoken');

const config = {
  issuerBaseURL: process.env.APP_ID_DISCOVERY_URL,
  baseURL: 'http://localhost:5000', 
  clientID: process.env.APP_ID_CLIENT_ID,
  secret: process.env.APP_ID_CLIENT_SECRET,
  idpLogout: true,
  authRequired: false, 
};

const authMiddleware = auth(config);

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.decode(token); 
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = { authMiddleware, verifyToken };