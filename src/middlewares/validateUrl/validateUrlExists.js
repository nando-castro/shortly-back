import connection from "../../db/database.js";
export async function validateUrlExists(req, res, next) {
  try {
    const { id } = req.params;
    const {rows: url} = await connection.query(`SELECT links."id" FROM "links" WHERE "id" = $1`,[id]);
    if(url.length === 0){
        return res.sendStatus(404);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
