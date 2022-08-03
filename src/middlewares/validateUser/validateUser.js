import connection from "../../db/database.js";
import userSchema from "../../schemas/userSchema.js";

export async function validateUser(req,res,next){
    try {
        const { name, email, password, confirmPassword } = req.body;
        const { error } = userSchema.validate({name,email,password,confirmPassword});
        if(error){
            return res.status(422).send(error.details);
        }
        if(password !== confirmPassword){
            return res.status(422).send('Senhas devem ser iguais');
        }
        const user = await connection.query(`SELECT * FROM "users" WHERE "email" = $1`,[email]);
        if(user.rows.length > 0){
            return res.sendStatus(409);
        }
        next();
    } catch (error) {
        console.log(error)
        res.send(500)
    }
}