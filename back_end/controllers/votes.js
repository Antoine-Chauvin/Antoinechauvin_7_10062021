const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur

exports.vote = (req, res, next) => {
    const voteUp = req.body.voteUp;
    const voteDown = req.body.voteDown;
    con.promise().query('SELECT value, user_id FROM vote WHERE user_id = ? ;',[req.userId])
    .then(([err, result]) =>{
        
        if (voteUp === 1 && result[0] !== 1 ){
            con.query(
                'INSERT INTO vote (value, user_id) VALUES (?,?,?);', [1,req.userId], (err, result) => {
                if (err){
                    return (err);
                }
                return res.status(201).json({ message: '+1 up vote'});
            });
        }
        else if (voteDown === 1 && result[0] !== 0 ){
            con.query('UPDATE vote SET value = 0 ;', (err, result) => {
                if (err){
                    return (err);
                }
                return res.status(201).json({ message: '+1 down vote'});
            });
            
        }
        else if (voteUp == 1 && result[0] === 1 || voteDown == 1 && result[0] === 0 ){
            con.query('UPDATE vote SET value = null ;', (err, result) => {
                if (err){
                    return (err);
                }
                return res.status(201).json({ message: 'rien à faire'});
            });
        }
        
    })
    .catch(error => res.status(500).json({ error }));
};