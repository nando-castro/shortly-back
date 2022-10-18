export default function errorHandler(error, req, res, next){
    if (error.type === "notFound") return res.sendStatus(404);
    return res.sendStatus(500);
}