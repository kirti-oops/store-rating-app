const express=require("express");

const router = express.Router();
const verifyToken=require("../middleware/authmiddleware");
const {
    getDashboard,
    addUser,
    getUsers,
    getUserById
}=require("../controllers/admincontroller");
const checkRole=require("../middleware/rolemiddleware");
const {
    addStore,
    getStores
}=require("../controllers/storecontroller");


router.get("/dashboard", 
    verifyToken,
checkRole("ADMIN"),
//(req,res)=>{
    //res.json({
       // message:"Welcome Admin",
       // user:req.user
    //});
//}

getDashboard
);

router.post(
    "/add-store",verifyToken,
    checkRole("ADMIN"),
    addStore
);

router.get(
    "/stores",
    verifyToken,
    checkRole("ADMIN"),
    getStores
);

router.post(
    "/add-user",
    verifyToken,
    checkRole("ADMIN"),
    addUser
);

router.get(
    "/users",
    verifyToken,
    checkRole("ADMIN"),
    getUsers
);

router.get(
    "/user/:id",
    verifyToken,
    checkRole("ADMIN"),
    getUserById
);

module.exports=router;