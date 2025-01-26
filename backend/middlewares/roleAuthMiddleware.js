import { User } from '../models/userModel'
import { Roles } from '../constants/Roles'

const authorizeRoles = (roles)=> {
    return (req,res,next)=>{
        if(roles){
            console.log(`route is allowed for roles : ${roles}`);
            if(!roles.includes(user.role.toLowerCase())){
                return res.status(403).json({
                    message: 'you are not authorized to access the endpoint'
                })
            }   
        }    
}
}
