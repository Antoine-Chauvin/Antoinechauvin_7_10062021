const con = require('../db_connect/mysql_connect');//permet d'avoir accès au BD

module.exports = (req, res, next) => {
    con.query('SELECT admin FROM user WHERE id_user = ?;', [req.userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'une erreur c\'est produite try again' });
        }
        if(result[0].admin === 1 ){
            next()
        }
        else{
            return res.status(401).json({ message: 'Mais dis donc Jamy c\'est pas bien t\'es pas Admin' });
        }
    })
}