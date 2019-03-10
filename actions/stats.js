import axios from 'axios';
import { sampleStats } from '../resources/sampleData/sampleStats';
import { genreMapping } from '../resources/genreMapping';
import { generateRandomHexColor } from '../resources/graphColors';

export const getAnimeStats = () => {
    return (dispatch) => {
        // Using sample data for now!
        // axios.get('https://r1ionjnnm6.execute-api.us-east-1.amazonaws.com/alpha/stats' )
        //     .then((response) =>

        // GENRE DISTRIBUTION: make an array compatible with recharts (pie chart):
        // for each genre, add its name, fill color, and value to an array
        const totalGenreDistribution = [];
        sampleStats.aggregations.genres_total.buckets.forEach((genre) => {
            totalGenreDistribution.push({
                name: genreMapping[String(genre.key)],
                value: genre.doc_count,
                fill: generateRandomHexColor()
            })
        });

        // GENRE PREVALENCE PER SEASON: make an array compatible with recharts (line chart):
        // for each season, add a line/data point for each genre with its name, stroke color, and value
        const genresPerSeason = [];
        // using a Set here so we don't accidentally re-add repeated genres when recording them
        const genresList = new Set([]);
        sampleStats.aggregations.season_buckets.buckets.forEach((season) => {
            const genreCounts = {};

            season.genres.buckets.forEach((genre) => {
                // make a separate array of the genres listed to reference in our graph render
                const genreName = genreMapping[String(genre.key)];

                genresList.add(genreName);

                genreCounts[genreName] = genre.doc_count;
            });

            genresPerSeason.push({
                ...genreCounts,
                season: season.key_as_string,
                // for each genre, add a line to chart (genre_name: amount)
            })
        });

        dispatch({
            type: 'ANIME_STATS',
            animeStats: sampleStats,
            totalGenreDistribution,
            genresPerSeason,
            genresList: [...genresList] // turn the Set into an array
        })
    // );
    }
};
