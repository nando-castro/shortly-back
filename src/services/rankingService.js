import * as rankingRepository from "../repositories/rankingRepository.js";

export async function getRanking() {
  const { rows: result } = await rankingRepository.getRanking();
  if (!result) {
    throw { type: "notFound", message: "Sem ranking" };
  }
  return result;
}
