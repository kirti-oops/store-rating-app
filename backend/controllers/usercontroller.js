const db=require("../config/db");

const submitRating=(req,res)=>{
    const user_id=req.user.id;

    const{
        store_id,
        rating
    }= req.body;

    const sql=`INSERT INTO ratings(user_id,store_id,rating) VALUES (?,?,?)`;

    db.query(
        sql,[user_id,store_id,rating],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message:"Rating Submitted Successfully"
            });
        }
    );
};

const updateRating =(req,res)=>{
    const user_id=req.user.id;

    const { store_id, rating}=req.body;

    const sql="UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?";

    db.query(
        sql,
        [rating,user_id,store_id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            if(result.affectedRows===0){
                return res.status(404).json({
                    message:"Rating not Found"
                });
            }
            res.status(200).json({
                message:"Rating Updated Successfully"
            });
        }
    );
};

const bcrypt=require("bcryptjs");
const updatePassword=async(req,res)=>{
    const user_id=req.user.id;

    const{password}=req.body;
    const hashPassword=await bcrypt.hash(password,10);

    const sql="Update users SET password=? WHERE id=?";
    
    db.query(sql,[hashPassword,user_id],(err,result)=>{
        if(err){
            return res.status(500).json
({
    message:err.message
}) ;
       }
       res.json({
        message:"Password Updated Successfully"
       });
    }
);
};

const getStores = (req, res) => {

    const user_id = req.user.id;

    const sql = `
    SELECT

    stores.id,
    stores.name,
    stores.address,

    ROUND(
        AVG(r1.rating),
        1
    ) AS overallRating,

    (
        SELECT rating

        FROM ratings r2

        WHERE
        r2.store_id =
        stores.id

        AND

        r2.user_id = ?

    ) AS userRating

    FROM stores

    LEFT JOIN ratings r1

    ON stores.id =
    r1.store_id

    GROUP BY
    stores.id,
    stores.name,
    stores.address
    `;

    db.query(
        sql,
        [user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(200).json(result);

        }
    );

};

module.exports={
    submitRating,
    updateRating,
    updatePassword,
    getStores
};