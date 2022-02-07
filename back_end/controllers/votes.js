const con = require('../db_connect/mysql_connect');//permet d'avoir accès au serveur

exports.vote = (req, res, next) => {
    const vote = req.body.vote;
    
    if (vote !== 1 && vote !== 0){
        return res.status(400).json({ message: 'tu te crois malin de mettre autre chose...'});
    }

    con.promise().query('SELECT id_vote,status_id,value, user_id FROM vote WHERE user_id = ? AND status_id = ? ;',[req.userId, req.body.statusId])
    .then(([rows, fields]) =>{
       
        if (rows.length === 0){/* creatio du vote */
            con.query(
                'INSERT INTO vote (status_id, value, user_id) VALUES (?,?,?);', [req.body.statusId, vote, req.userId], (err, result) => {
                if (err){
                    return (err);
                }
                return res.status(201).json({ message: 'à voté'});
            });
        }

        else if (rows[0].value === vote){/* suppr du vote */
            con.query( 'DELETE FROM vote WHERE id_vote = ?;',[rows[0].id_vote], (err, result) => {
                if (err){
                    return (err);
                }
                return res.status(201).json({ message: 'vote supp'});
            });
        }
        
        else if (rows[0].value !== vote){ /* modifie le vote */
            con.query( 'UPDATE vote SET value = ? WHERE id_vote = ? ;',[vote, rows[0].id_vote], (err, result) => {
                if (err){
                    return (err);
                }
                return res.status(201).json({ message: 'vote modifié'});
            });
        }
          
        
    })
    .catch(error => res.status(500).json({ error }));
};


exports.affichageNbrVotes = async (req, res, next) => {
    const [upVote] = await con.promise().query('SELECT COUNT(id_vote) up_vote FROM vote WHERE value = 1 AND status_id = ?;',[req.query.statusId])
    
    const [downVote] = await con.promise().query('SELECT COUNT(id_vote) down_vote FROM vote WHERE value = 0 AND status_id = ?;',[req.query.statusId])
    
    return res.status(200).json({resulat : upVote[0].up_vote - downVote[0].down_vote});
};
