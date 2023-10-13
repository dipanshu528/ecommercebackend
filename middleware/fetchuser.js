const jwt = require('jsonwebtoken');
const JWT_SECRET = "shhhhh$hh";

const fetchuser = (req, res, next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "please athuenticate using a valid token"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    
    next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ error: "invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ error: "token expired" });
        }
        // Handle other errors if necessary
        return res.status(401).send({ error: "please authenticate using a valid token" });
    }
}

module.exports = fetchuser;