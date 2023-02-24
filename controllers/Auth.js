const Users = require("../models/UserModel.js");
const argon2= require("argon2");

module.exports. Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "Utilisateur non trouvé"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

module.exports. Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Veuillez vous connecter à votre compte !"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Utilisateur non trouvé"});
    res.status(200).json(user);
}

module.exports. logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Impossible de se déconnecter"});
        res.status(200).json({msg: "Vous vous êtes déconnecté"});
    });
}