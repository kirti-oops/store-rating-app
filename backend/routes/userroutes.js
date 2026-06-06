const express=require("express");
const router=express.Router();

const verifyToken=require("../middleware/authmiddleware");
const {
    submitRating,
    updateRating,
    updatePassword,getStores
}= require("../controllers/usercontroller");




router.get("/profile",verifyToken,(req,res)=>{
    res.status(200).json({
        message:"Protected Route Accessed",
        user:req.user
    });
}
);

router.post(
    "/rate-store",
    verifyToken,submitRating
);

router.put(
    "/update-rating",
    verifyToken,updateRating
);

router.put(
    "/change-password",
    verifyToken,
    updatePassword
);

router.get(
    "/stores",
    verifyToken,getStores
);



module.exports=router;