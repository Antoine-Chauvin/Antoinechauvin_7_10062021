const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur


//blocker un compte
exports.blockUser = (req, res, next) => {

    if(req.body.userId == undefined){
        return res.status(400).json({message: "aucun utilisateur choisi"})
    }

    con.query('UPDATE user SET state_block = 1 WHERE id_user = ?;',[req.body.userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error });
        }
        return res.status(201).json({ message: 'Utilisateur bloqué' })
    })
}
//blocker un status

exports.blockStatus = (req, res, next) => {
    if(req.body.statusId == undefined){
        return res.status(400).json({message: "aucun status choisi"})
    }
    con.query('UPDATE status SET block = 1 WHERE id_status = ?',[req.body.statusId], (err, result) => {
        if (err) {
            return res.status(500).json({ error });
        }
        return res.status(201).json({ message: 'Status bloqué' })
    })
}