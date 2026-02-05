import { getAuthorRanking } from "../../handlers/authorRanking.handler.js";

export const getAuthorRankingController = async (req, res, next) => {
    try {
        const authorRanking = await getAuthorRanking();
        res.json({
            authorRanking
        })
    } catch (err) {
        next(err);
    }
}