const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur
const bcrypt = require('bcrypt'); // chiffrement
const jwt = require('jsonwebtoken'); // token generator package
const emailValidator = require('email-validator');// email validator package
const passwordValidator = require('password-validator'); // password validator package
const fs = require('fs');

//créa du schéma du mpd
const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(50)                                  // Maximum length 50
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                // Must have at least 1 digit
    .has().not().symbols();                         // Has no symbols

    //crea compte
exports.signup = (req, res, next) => {
    const name = req.body.name
    const lastName = req.body.lastName
    const mailUser = req.body.email
    const passUser = req.body.password
    const created_date = new Date()
    const imgProfil = `/image_profil/${req.file.filename}`

    const regexName = /(.*[a-z]){3,30}/;
    //verification que les champs de nom prenom sont valide grâce aux regex    
    if (!regexName.test(name) || !regexName.test(lastName)) {
        return res.status(400).json({ message: 'Champs incomplet' });
    }

    //Vérification que l'email et password ne sont pas valide et envoie d'err
    if (!emailValidator.validate(mailUser) || !passwordSchema.validate(passUser)) {
        return res.status(400).json({ message: 'Vérifier votre adresse mail, et le mdp doit avoir au moins 8 caractères, 1 majuscule et  des chiffres ' });
    }
    //Cas ou l'email et pass valide envoie du form en DB + vérification que l'email n'est pas déjà en DB
    con.promise().query('SELECT 1 FROM user WHERE email = ?;', [mailUser])
        .then(([rows, fields]) => {
            if (rows.length === 0) {
                bcrypt.hash(passUser, 10)// hashage du password avec le sel compris dans le nb of round
                    .then(hash => {
                        con.promise().query('INSERT INTO user (email, password, name, lastname, created_at, image_user) VALUES (?, ?, ?, ?, ?, ?);', [mailUser, hash, name, lastName, created_date, imgProfil])
                            .then(hash => res.status(201).json({ message: 'Utilisateur créé !' }))
                            .catch(error => res.status(400).json({ error }));
                    });
            }
            else {
                res.status(400).json({ message: 'Email déjà utilisé' })
            }
        });
}

//login
exports.login = (req, res, next) => {
    const mailUser = req.body.email
    const passUser = req.body.password
// verif des champ si ils ont de charac present
    if ( mailUser == null || passUser == null) {
        return res.status(400).json({ error: 'champ non renseigné !' });
    }
//verif du mail DB 
    con.promise().query('SELECT password, id_user FROM user WHERE email = ?;', [mailUser])
        .then(([rows, fields]) => {
//si pas de mail renvoie d'err
            if (rows.length === 0) {
                return res.status(500).json({ message: "L'utilisateur n'existe pas" });
            }
//comparaison des mdp 
            bcrypt.compare(passUser, rows[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(500).json({ message: "L'email ou le mot de passe est incorect" });
                    }
                    res.status(200).json({
                        message: 'Login effectué, en cours de redirection',
                        userId: rows[0].id_user,
                        token: jwt.sign(
                            { userId: rows[0].id_user },
                            process.env.tk,
                            { expiresIn: '24h' }
                        ),

                    });
                })
                .catch(error => res.status(500).json({ message: 'Une erreur c\'est produite' }));
        })
        .catch(error => res.status(500).json({ error }));
};

//accès au infos du profil
exports.infosProfil = (req, res, next) => {  
    con.query('SELECT name, lastname, image_user, email FROM user WHERE id_user= ?;', [req.params.id],//à revoir
    (err, result) => {
        if(err){
            return res.status(500).json({ message: 'Une erreur c\'est produite' });
        }
        if (result.length !== 0){ 
            return res.status(200).json(result[0]);
        }
        else{
            return res.status(404).json({message : 'utilisateur nom trouvé'});
        }
        
    })
};

//accès à tout les post du profil
exports.allUserStatus = (req, res, next) => {
con.query('SELECT title, image FROM status WHERE user_id = ? ORDER BY id_status DESC;',[req.params.id],//à revoir
(err, result) => {
    if(err){
        return res.status(500).json({ message: 'Une erreur c\'est produite' });
    }
        return res.status(200).json(result);
    
    
    
})
}


//modif du profil (ajout d'image)
exports.modifImgProfil = async (req,res,next) => {

   
    const imgProfil = `/image_profil/${req.file.filename}`
    const [suppImgProfil] = await con.promise().query('SELECT image_user FROM user WHERE id_user = ?;', [req.userId])
    
    const imageSupp = suppImgProfil[0].image_user
    console.log(imageSupp)
    

    if (suppImgProfil != "imgProfilDef.jpg"){
        fs.unlink(`images${imageSupp}`, () => { 
        })
    }
    con.query('UPDATE user SET image_user = ? WHERE id_user= ? ;',[imgProfil, req.userId], (err, result) => {
        if(err){ 
            return res.status(400).json({ error });
        }
        return res.status(201).json({ message: 'Photo de profil changé '})
    });
}