const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur



// chanel creation 
exports.createChanel = (req,res,next) =>{ 
    const titleChan = req.body.title
    const descriptionChan = req.body.content   

    const regexSimpform = /(.*[a-z]){3,300}/;
    //verification que les champs sont valide grâce aux regex    
    if (!regexSimpform.test(titleChan) || !regexSimpform.test(descriptionChan)) {
        return res.status(400).json({ message: 'Champs incomplet' });
    }
    con.query('INSERT INTO chanel (title, content, creator_id) VALUES (?, ?, ?);', [titleChan, descriptionChan, req.userId],
    (err, resultat) => {
    
        if(err){   
            return res.status(400).json({ message: 'Une erreur c\'est produite' });
        }
        return res.status(201).json({ message: 'Chanel crée'});
    })

};
//get all chanel 
exports.getAllChanel = (req,res,next) =>{
    con.query(`SELECT id_chanel, title FROM chanel;`,
    (err, resultat) => {
        if(err){   
            return res.status(400).json({ message: 'Une erreur c\'est produite' });
        }
        return res.status(201).json(resultat);
    })

 }



