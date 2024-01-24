const jwt = require ("jsonwebtoken");
require('dotenv').config();
const { TOKEN_SECRET } = process.env;

const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  
  console.log(token)
  next();
}

const authRequired2 = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      //console.log(user)  //{ id: '65a7e978c581b641bc34a0da', iat: 1705509314, exp: 1705595714 }
      req.user = user;//lo guardas en req.user en directorio
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {authRequired, authRequired2};