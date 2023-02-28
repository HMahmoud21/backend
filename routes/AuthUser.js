const express=require("express");
const{Login,registrer}=require("../controllers/Auth")

const router=express.Router();
router.post("/login",Login);
router.post("/registrer",registrer);

module.exports = router;