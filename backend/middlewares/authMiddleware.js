import jwt from 'jsonwebtoken'
import { User } from '../models/userModel'
import { Roles } from '../constants/Roles'

const authAndRoleMiddleware = (roles = [])=>{
    return async (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(403).json({
            msg:"authentication is required",
            success:false,
        })
    }
    const finalToken = token.split(" ")[1];
    try{
        const decoded = await jwt.verify(finalToken,process.env.TOKEN_KEY);
        const user = User.findById(decoded.id)
        if (!user) {
            return res.status(404).json({
              message: "User not found",
              success: false,
            });
          }
        if(roles){
            console.log(`route is allowed for roles : ${roles}`);
            if(!roles.includes(user.role.toLowerCase())){
                return res.status(403).json({
                    message: 'you are not authorized to access the endpoint'
                })
            }   
        }    
        req.userId=user.id;
        next();
    }
    catch(error){
       res.status(403).json({
        msg:"Invalid or expired token",
        success:false
       })
    }
}
}

export default authAndRoleMiddleware;

