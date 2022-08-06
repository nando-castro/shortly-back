import connection from "../../db/database.js";

export async function validateSession(req, res, next) {
  try {
    const { token } = res.locals;
    const session = await connection.query(
      `SELECT * FROM "sessions" WHERE "token" = $1`,
      [token]
    );
    if (session.rows.length === 0) {
      return res.sendStatus(401);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
