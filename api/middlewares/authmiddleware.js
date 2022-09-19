const {verify} = require('jsonwebtoken')

const validateToken = (req, res, next) =>{
    const accessToken = req.header("token");

    if (!accessToken){ return res.json({error: "El usuario no ha iniciado sesión"})};
    try {
        const validToken= verify(accessToken, "DbmyStxumC")
        const user = req.user
        if (validToken){
            return next();
        }
    } catch (error) {
        return res.json({error: error})
    }
}

module.exports= {validateToken}