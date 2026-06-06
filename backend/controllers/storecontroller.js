const db=require("../config/db");

const addStore=(req,res)=>{
    const {
        name,
        email,
        address,
        owner_id
    }=req.body;

    const sql= `INSERT INTO stores(name,email,address,owner_id) VALUES (?,?,?,?)`;

    db.query(
        sql,[name,email,address,owner_id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            res.status(201).json({
                message:"Store Added Succesfully"
            });
        }
    );
};

/*const getStores=(req,res)=>{
    const sql="SELECT * FROM stores";

    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({
                message:err.message
            });
        }
        res.status(200).json(result);
    });
}
*/

const getStores = (req, res) => {

    const search = req.query.search || "";

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const sql = `
    SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        stores.owner_id,
        ROUND(AVG(ratings.rating),1) AS overallRating
    FROM stores
    LEFT JOIN ratings
    ON stores.id = ratings.store_id
    WHERE stores.name LIKE ?
    OR stores.address LIKE ?
    GROUP BY stores.id
    LIMIT ?
    OFFSET ?
    `;

    db.query(
        sql,
        [
            `%${search}%`,
            `%${search}%`,
            limit,
            offset
        ],
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
    addStore,
    getStores
};