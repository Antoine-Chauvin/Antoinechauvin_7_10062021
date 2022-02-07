const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur
const fs = require('fs');

//récupérer les status
exports.getAllStatus = (req, res, next) => {
    con.query(`SELECT id_status, title, user_id, image, name, lastname, image_user, created_at_status 
                FROM status 
                JOIN user ON status.user_id = user.id_user  
                WHERE block = 0 
                ORDER BY id_status DESC;`, (err, result) => {
        if (err) {
            throw (err);
        }
        return res.status(200).json(result);
    })
};

exports.getAllstatusProfil = (req, res, next) => {
    con.query(`SELECT id_status, title, user_id, chanel_id, image 
               FROM status 
               WHERE block= 0 
               AND user_id = ? 
               ORDER BY id_status DESC;`, [req.userId], (err, result) => {
        if (err) {
            throw (err);
        }
        return res.status(200).json(result);
    })
}
exports.getAllstatusChanel = (req, res, next) => {
    con.query(`SELECT id_status, status.title status_title, user_id, chanel_id, image ,chanel.title chanel_title, content
                FROM status 
                JOIN chanel ON status.chanel_id = chanel.id_chanel  
                WHERE block= 0 
                AND chanel_id = ? 
                ORDER BY id_status DESC;`,
                 [req.query.chanId], (err, result) => {
        if (err) {
            throw (err);
        }
        return res.status(200).json(result);
    })
}

exports.getOneStatus = (req, res, next) => {
    con.query(`SELECT id_status, title, user_id, chanel_id, created_at_status, image, name, lastname, image_user 
                FROM status 
                JOIN user ON status.user_id = user.id_user 
                WHERE block="0" AND id_status = ?;`, [req.query.statusId], (err, result) => {
        if (err) {
            throw (err);
        }
        return res.status(200).json(result);
    })
};

//création d'un status
exports.createStatus = (req, res, next) => {
    const imageToShare = `/image_shared/${req.file.filename}`

    const regexStatus = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;
console.log('toto')
    if (regexStatus.test(req.body.title) && req.file != null) {
        const dataStatus = {
            image: imageToShare,
            title: req.body.title,
            created_at_status: new Date(),
            user_id: req.userId,
            chanel_id: req.body.chanChoose //choix du chanel dans le quelle poster notre status
        }
        con.query('INSERT INTO status SET ?;', dataStatus, (err, resultat) => {
            if (err) {
                console.log(err)
                return res.status(501).json({ message: 'Erreur dans le post '});
            }
            return res.status(201).json({ message: 'Post effectué ! ' });
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises ' });
    }


};


// Modifiaction de son status
exports.modifStatus = async (req, res, next) => {
    const regexStatus = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;

    const imgToShare = `/image_shared/${req.file.filename}`
    const [suppImgShared] = await con.promise().query('SELECT image FROM status WHERE user_id = ?;', [req.userId])

    const imageSupp = suppImgShared[0].image

    if (imgToShare != suppImgShared && req.file) {
        fs.unlink(`images${imageSupp}`, () => {
        })
    }

    if (regexStatus.test(req.body.title) && imgToShare != null ) {
        const dataStatus = {
            title:req.body.title,
            image: imgToShare,
            chanel_id:req.body.chanChoose,
            created_at_status:new Date()
            
        }
        con.query('UPDATE status SET ? WHERE user_id = ? AND id_status = ? ;', [dataStatus, req.userId, req.body.statusId], (err, resultat) => {
            if (err) {
                console.log(err)
                return res.status(501).json({ message: 'Erreur dans le post ' });
            }
            return res.status(201).json({ message: 'Post modifié ! ' });
        });
    }   
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises ' });
    }
};