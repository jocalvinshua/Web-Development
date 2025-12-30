import mongoose from "mongoose"

const AnimeSchema = new mongoose.Schema({
    id: String,
    title: String,
    year: Number,
    image: String,
    score: Number,
    synopsis: String
})

// Exporting the Anime schema
export default mongoose.model('Anime', AnimeSchema)