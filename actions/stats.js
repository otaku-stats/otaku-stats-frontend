import axios from 'axios';
import { sampleStats } from '../resources/sampleData/sampleStats';
import { genreMapping } from '../resources/genreMapping';
import { graphColors } from '../resources/graphColors';

export const getAnimeStats = () => {
    return (dispatch) => {
        // Using sample data for now!
        // axios.get('https://r1ionjnnm6.execute-api.us-east-1.amazonaws.com/alpha/stats' )
        //     .then((response) =>

        // make an array that recharts will be able to use
        const totalGenreDistribution = [];
        sampleStats.aggregations.genres_total.buckets.forEach((genre, index) => {
            totalGenreDistribution.push( {
                name: genreMapping[String(genre.key)],
                value: genre.doc_count,
                fill: graphColors[index] || "hotpink"
            })
        });

        dispatch({
            type: 'ANIME_STATS',
            animeStats: sampleStats,
            totalGenreDistribution
        })
    // );
    }
};
