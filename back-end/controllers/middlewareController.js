import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            console.log(accessToken)
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            })
            
        } else {
            return res.status(401).json("Bạn không có token");
        }
    
}

export { verifyToken }