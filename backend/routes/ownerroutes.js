const express=require("express");

const router=express.Router();

const verifyToken= require("../middleware/authmiddleware");

const{
    ownerDashboard,getAverageRating
}=require("../controllers/ownercontroller");

router.get(
    "/dashboard",
    verifyToken, ownerDashboard
);

router.get(
    "/average-rating",
    verifyToken,
    //checkRole(
        //"OWNER"
    //),
    getAverageRating
);

module.exports=router;