import AnimeSchema from "../model/animeModel.js";

export const getAnime = async (req, res) => {
    try {
        const { id } = req.params;
        const anime = await AnimeSchema.findOne({ mal_id: id });
        if (!anime) {
            return res.status(404).json({ success: false, error: "Anime not found" });
        }
        res.status(200).json({ success: true, data: anime });
    } catch (error) {
        res.status(500).json({ success: false,error: "Failed to fetch anime data" });
    }
}