const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur




//chanel add new status ???


// chanel creation 
exports.chanelCreate = (req,res,next) =>{ 
    const titleChan = req.body.title
    const descriptionChan = req.body.content   

    const regexSimpform = /(.*[a-z]){3,300}/;
    //verification que les champs sont valide grâce aux regex    
    if (!regexSimpform.test(titleChan) || !regexSimpform.test(descriptionChan)) {
        return res.status(400).json({ message: 'Champs incomplet' });
    }
    con.promise().query('INSERT INTO chanel (title, content, creator_id) VALUES (?, ?, ?,);', [titleChan,descriptionChan, req.params.id]),
    (err, resultat) => {
        if(err){   
            return res.status(400).json({ message: 'Une erreur c\'est produite' });
        }
        return res.status(201).json({ message: 'Chanel crée'});
    }

};