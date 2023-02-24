
const Users = require("../models/UserModel.js");

module.exports. verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Veuillez vous connecter à votre compte !"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Utilisateur non trouvé"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}

module.exports. adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Utilisateur non trouvé"});
    if(user.role !== "admin") return res.status(403).json({msg: "Accès restreint"});
    next();
}