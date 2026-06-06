const db=require("../config/db");

const ownerDashboard=(req,res)=>{
    const owner_id=req.user.id;

    const sql=`SELECT users.name,users.email,ratings.rating FROM ratings JOIN users ON ratings.user_id=users.id
    JOIN stores ON ratings.store_id=stores.id WHERE stores.owner_id=?`;

    db.query(sql,[owner_id],(err,result)=>{
        if(err){
            return res.status(500).json({
                message:err.message
            });
        }
        res.status(200).json(result);
    });
};

const getAverageRating = (req, res) => {

    const ownerId =
    req.user.id;

    const sql =
    `SELECT
    AVG(ratings.rating)
    AS averageRating

    FROM ratings

    JOIN stores
    ON ratings.store_id =
    stores.id

    WHERE
    stores.owner_id = ?`;

    db.query(
        sql,
        [ownerId],
        (err, result) => {

            if(err){
                return res.status(500).json({
                    message:
                    err.message
                });
            }

            res.status(200).json(
                result[0]
            );

        }
    );

};

module.exports={
    ownerDashboard,getAverageRating
};