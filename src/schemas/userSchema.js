import joi from "joi";

const userSchema = joi.object({
    name: joi.string().min(1).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
    confirmPassword: joi.string().min(1).required(),
})

export default userSchema;
