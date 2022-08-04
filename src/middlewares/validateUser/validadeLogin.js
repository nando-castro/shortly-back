import connection from "../../db/database.js";
import loginSchema from "../../schemas/loginSchema.js";
import bcrypt from "bcrypt";

export async function validateLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(422).send(error.details);
    }

    const { rows: user } = await connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    const [usersInfo] = user;

    if (user.length === 0) {
      return res.sendStatus(401);
    }

    const comparePassword = bcrypt.compareSync(password, usersInfo.password);

    if (!comparePassword) {
      return res.sendStatus(401);
    }
    res.locals.user = usersInfo;
    next();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
}
