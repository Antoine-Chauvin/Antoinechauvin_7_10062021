const jwt = require('jsonwebtoken');
const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //Vient récupérer le token dans headers authorizations, coupe l'infos à l'espace, créer un tableau avec le split puis on récup l'entrée du token qui est en 2eme pos [1]
    const decodedToken = jwt.verify(token, process.env.tk);
    const userId = decodedToken.userId;
    
    req.userId = userId
    
    con.query('SELECT state_block FROM user WHERE id_user = ?;', [req.userId], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'une erreur c\'est produite try again' });
      }
      if(result[0].state_block !== 1 ){
          next()
      }
      else{
          return res.status(401).json({ message: 'Mais dis donc Fred t\'es bloquer' });
      }
    }) 
  
  } catch (err) { 
    console.log(err)
    res.status(401).json({
      error: 'Token Invalid'
    })
  }
};