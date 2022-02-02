const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //Vient récupérer le token dans headers authorizations, coupe l'infos à l'espace, créer un tableau avec le split puis on récup l'entrée du token qui est en 2eme pos [1]
    const decodedToken = jwt.verify(token, process.env.tk);
    const userId = decodedToken.userId;
    req.userId = userId
    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')});
  }
};