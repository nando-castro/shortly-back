import connection from "../../db/database.js";
import loginSchema from "../../schemas/loginSchema.js";

export async function validateLogin(req,res,next){
    try {
        const { email, password } = req.body;
        const { error } = loginSchema.validate({email,password});
        if(error){
            return res.status(422).send(error.details);
        }
        next();
    } catch (error) {
        console.log(error)
        res.send(500)
    }
}