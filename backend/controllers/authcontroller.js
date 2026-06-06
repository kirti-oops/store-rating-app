const jwt=require("jsonwebtoken");
const db=require("../config/db");
const bcrypt=require("bcryptjs");

const register=async(req,res)=>{
    try{
        const{
            name,email,address,password
        }=req.body;

        const emailRegex = /^\S+@\S+\.\S+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Invalid Email Format"
    });
}

if (
    name.length < 20 ||
    name.length > 60
) {
    return res.status(400).json({
        message:
        "Name should be between 20 and 60 characters"
    });
}

if (
    address.length > 400
) {
    return res.status(400).json({
        message:
        "Address should not exceed 400 characters"
    });
}

const passwordRegex =
/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

if (
    !passwordRegex.test(password)
) {
    return res.status(400).json({
        message:
        "Password must be 8-16 characters and contain one uppercase and one special character."
    });
}

        //Hash Password

        const hashPassword= await bcrypt.hash(password,10);

        const sql=`INSERT INTO users(name,email,address,password,role) VALUES (?,?,?,?,?)`;

        db.query(sql,[
            name,email,address,hashPassword,"USER"
        ],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            res.status(201).json({
                message:"User Registered Successfully"
            });
        }
        );
    }catch(error){
        res.status(500).json({
            message:ErrorEvent.message
        });
    }
};

const login=(req,res)=>{
    const {email,password}=req.body;
    const sql="SELECT * FROM users WHERE email=?";
    db.query(sql,[email],async(err,result)=>{
        if(err){
            return res.status(500).json({
                message:err.message
            });
        }
        if(result.length==0){
            return res.status(404).json({
                message:"User not Found"
            });
        }

        const user=result[0];
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid Password"
            });
        }
       const token =jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,{
            expiresIn:"1d"
        }
       );

       res.status(200).json({
        message:"Login Successful",
        token:token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
       });
    });

};

module.exports={
    register,
    login
};