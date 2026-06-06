const db=require("../config/db");
const bcrypt=require("bcryptjs");

const getDashboard=(req,res)=>{
    const dashboardData={};

    db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err,userResult)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            dashboardData.totalUsers=userResult[0].totalUsers;

            db.query(
                "SELECT COUNT(*) AS totalStores FROM stores",
                (err,storeResult)=>{
                    if(err){
                        return res.status(500).json({
                            message:err.message
                        });
                    }

                    dashboardData.totalStores=storeResult[0].totalStores;

                    db.query(
                        "SELECT COUNT(*) AS totalRatings FROM ratings",
                        (err,ratingResult)=>{
                            if(err){
                                return res.status(500).json({
                                    message:err.message
                                });
                            }
                            dashboardData.totalRatings=ratingResult[0].totalRatings;

                            res.status(200).json(dashboardData);
                        }
                    );
                }
            );
        }
    
    );
};


const addUser = async (req, res) => {

    try {

        const {
            name,
            email,
            address,
            password,
            role
        } = req.body;

        const hashPassword =
        await bcrypt.hash(
            password,
            10
        );

        const sql =
        `INSERT INTO users
        (name,email,address,password,role)
        VALUES
        (?,?,?,?,?)`;

        db.query(
            sql,
            [
                name,
                email,
                address,
                hashPassword,
                role
            ],
            (err, result) => {

                if(err){
                    return res.status(500).json({
                        message: err.message
                    });
                }

                res.status(201).json({
                    message:
                    "User Added Successfully"
                });

            }
        );

    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getUsers = (req, res) => {

    const sql =
    `SELECT
    id,
    name,
    email,
    address,
    role
    FROM users
    WHERE role='USER'
    OR role='ADMIN'`;

    db.query(
        sql,
        (err, result) => {

            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(200).json(result);

        }
    );

};

const getUserById = (req, res) => {

    const id = req.params.id;

    const sql =
    `SELECT
    id,
    name,
    email,
    address,
    role
    FROM users
    WHERE id=?`;

    db.query(
        sql,
        [id],
        (err,result)=>{

            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }

            if(result.length===0){
                return res.status(404).json({
                    message:"User Not Found"
                });
            }

            res.status(200).json(
                result[0]
            );

        }
    );

};

module.exports={
    getDashboard,
    addUser,
    getUsers,
    getUserById
};