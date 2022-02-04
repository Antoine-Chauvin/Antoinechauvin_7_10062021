const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur

//create a comment
exports.createComment = (req, res, next) => {
    const regexStatus = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;
    if (regexStatus.test(req.body.text)) {

        con.query('INSERT INTO comment SET text = ?, user_id = ?, status_id = ?;', [req.body.text, req.userId, req.body.statusId], (err, resultat) => {
            if (err) {
                return res.status(501).json({ message: 'Erreur dans le post ' });
            }
            return res.status(201).json({ message: 'Post effectué ! ' });
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises ' });
    }
}

//modify a comment
exports.modifcomment = (req, res, next) => {
    const regexStatus = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;
    if (regexStatus.test(req.body.text)) {
       con.query('UPDATE comment SET text = ? WHERE user_id = ? AND id_comment = ?;', [req.body.text, req.userId, req.body.commentId], (err, resultat) => {
            if (err) {
                console.log(err)
                return res.status(501).json({ message: 'Erreur dans le post ' });
            }
            return res.status(201).json({ message: 'commentaire effectué ! ' });
        });
    }
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises ' });
    }
};

// get all comments of a status
exports.getComments = (req, res, next) => {

    con.query('SELECT id_comment, text, user_id, status_id, id_user, name, lastname, image_user FROM comment JOIN user ON comment.user_id = user.id_user WHERE comment.status_id = ? ORDER BY id_comment DESC;', [req.body.statusId],
        (err, resultat) => {
            if (err) {
                return res.status(500).json({ err });
            }
            return res.status(200).json({ resultat });
        })
};