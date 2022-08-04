import urlSchema from "../../schemas/urlSchema.js";

export async function validateUrl(req, res, next) {
  try {
    const { url } = req.body;
    const { error } = urlSchema.validate({ url });
    if (error) {
      return res.status(422).send(error.details);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
