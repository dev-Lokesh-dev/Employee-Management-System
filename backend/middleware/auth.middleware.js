import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({msg:'Provide token without a valid token you cannot procced'});

    try {
        const  verified =   jwt.verify(token,'secret')
        req.user = verified;
        console.log(verified);
        
        next()
    } catch (error) {
        res.status(403).json(error);
    }
}

export {authMiddleware}