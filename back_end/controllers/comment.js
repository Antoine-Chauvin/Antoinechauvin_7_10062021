const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur

//create a comment
exports.createComment = (req, res, next) => {
    const regexStatus = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;
    if (regexStatus.test(req.body.message) && req.file != null) {
        const dataComment = {
            user_id: req.userId,
            text: req.body.text,
        }
        con.query('INSERT INTO comment SET ? WHERE status_id = ?;', [dataComment, req.body.statusId], (err, resultat) => {
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
    if (regexStatus.test(req.body.message) && req.file != null) {
       con.query('UPDATE comment SET text = ? WHERE id_user = ?;', [req.body.text, req.userId], (err, resultat) => {
            if (err) {
                return res.status(501).json({ message: 'Erreur dans le post ' });
            }
            return res.status(201).json({ message: 'satus effectué ! ' });
        });
    }
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises ' });
    }
};

// get all comments of a status
exports.getComments = (req, res, next) => {

    con.query('SELECT * FROM comment JOIN user ON comment.user_id = user.id_user WHERE comment.status_id = ? ORDER BY id_comment DESC;', [req.params.id],
        (err, resultat) => {
            if (err) {
                return res.status(500).json({ err });
            }
            return res.status(200).json({ resultat });
        })
};