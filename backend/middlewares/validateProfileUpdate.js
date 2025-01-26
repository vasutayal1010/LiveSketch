import {z} from 'zod'

const profileUpdateSchema = z.object({
    username: z.string().nonempty({ message: 'Name is required' }).optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).optional(),
})

export const validateProfileUpdat = (req,res,next)=>{
    try{
        profileUpdateSchema.safeParse(req.body);
        next();
    }
    catch(error){
        res.status(500).json({
            message:"validation failed",
            success:false,
            errors:error.errors,
        })
    }
}