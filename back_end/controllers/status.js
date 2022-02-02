const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur

//récupérer les status
exports.getAllSatus = (req, res, next) => {
    con.query('SELECT * FROM status WHERE block="0" ORDER BY id DESC;', (err, result) => {
        if (err) {
            throw (err);
        }
        return res.status(200).json({ result });
    })
};

exports.getAllstatusProfil = (req, res, next) => {
    con.query('SELECT id_status, title, user_id, chanel_id, image FROM status WHERE block="0" AND user_id = ? ORDER BY id DESC;',[req.userId], (err, result) => {
        if (err) {
            throw (err);
        }
        return res.status(200).json({ result });
    })
}
exports.getAllstatusChanel = (req, res, next) => {
    con.query('SELECT id_status, title, user_id, chanel_id, image FROM status WHERE block="0" AND chanel_id = ? ORDER BY id DESC;',[req.body.chanID], (err, result) => {
        if (err) {
            throw (err);
        }
        return res.status(200).json({ result });
    })
}

exports.getOneSatus = (req, res, next) => {
    con.query('SELECT id_status, title, user_id, chanel_id, image FROM status WHERE block="0" AND id_status = ?;', [req.body.statusId], (err, result) => {
        if (err) {
            throw (err);
        }
        return res.status(200).json({ result });
    })
};

//création d'un status
exports.createStatus = (req, res, next) => {
    const regexStatus = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;
    if (regexStatus.test(req.body.message) && req.file != null) {
        const dataStatus = {
            user_id: req.userId,
            image: `/image_shared/${req.file.filename}`,
            title: req.body.title,
            created_at: new Date(),
            chanel_id: req.body.chanelChoice//choix du chanel dans le quelle poster notre status
        }
        con.query('INSERT INTO status SET ?;', [dataStatus], (err, resultat) => {
            if (err) {
                return res.status(501).json({ message: 'Erreur dans le post ' });
            }
            return res.status(201).json({ message: 'Post effectué ! ' });
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises ' });
    }


};


// Modifiaction de son status
exports.modifStatus = (req, res, next) => {
    const regexStatus = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;
    if (regexStatus.test(req.body.message) && req.file != null) {
        const dataStatus = {
            image: `/image_shared/${req.file.filename}`,
            title: req.body.title,
            chanel_id: req.body.chanelChoice//choix du chanel dans le quelle poster notre status
        }
        con.query('UPDATE status SET ? WHERE id_user = ?;', [dataStatus, req.userId], (err, resultat) => {
            if (err) {
                return res.status(501).json({ message: 'Erreur dans le post ' });
            }
            return res.status(201).json({ message: 'Post effectué ! ' });
        });
    }
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises ' });
    }
};