
import { TvSeries } from '../../models/tvseries';
import DB from '../../models/db.init'
import { getTvSeries, getAllEpisodesForSeason } from '../tmdbapi/tmdb-api'

const rankEpisodes = (episodes: any[]) => {

    episodes.sort((a: any, b: any): number => {
        return b.averageVotes - a.averageVotes
    })
}

export const getSeriesAllEpisodes = async (seriesId: string, seasons: any[]) => {

    let promiseArray: any[] = []
    seasons.forEach((season: any) => {
        let { seasonNumber } = season
        let seasonEpisodesPromise = getAllEpisodesForSeason(seriesId, seasonNumber)
        promiseArray.push(seasonEpisodesPromise)
    })
    try {
        let seasonsEpisodes = await Promise.all(promiseArray)
        let episodes: any[] = []
        seasonsEpisodes.forEach((seasonEpisodes: any[]) => {
            episodes = episodes.concat(seasonEpisodes)
        })
        //console.log("all episodes",episodes);
        return episodes
    } catch (err) {
        console.log("errr all epi", err);
    }

}
const getSeriesTopEpisodes = async (seriesId: string): Promise<any> => {
    let result = DB.get("tvSeries").find({ seriesId });
    let tvSeries: TvSeries = result.value()
    if (!tvSeries) {
        try {
            tvSeries = await getTvSeries(seriesId);
            let seasons = tvSeries.seasons ?? []
            //console.log("tvseries", tvSeries)
            let episodes = await getSeriesAllEpisodes(seriesId, seasons)
           // console.log(episodes)
            rankEpisodes(episodes)
            let topTwentyEpisodes = episodes.slice(0, 20)
            tvSeries.topTwentyEpisodes = topTwentyEpisodes
            await DB.get("tvSeries").push(tvSeries).write()

            let seriesInfo: any = {}

            seriesInfo.seriesId= tvSeries.seriesId
            seriesInfo.seriesName = tvSeries.seriesName
            seriesInfo.accessCount = 1
            await DB.get("analytics").push(seriesInfo).write()
            return topTwentyEpisodes;
        } catch (err) {
            console.log("err getSeriesTopEpisodes", err);
            throw err;

        }
    } else {
        let seriesInfo:any= {}
        seriesInfo = await DB.get("analytics").find({ seriesId }).value()
       // console.log("series Info", seriesInfo)
        seriesInfo.accessCount = seriesInfo.accessCount + 1

      //  console.log("seriesInfo", seriesInfo)
        await DB.get("analytics")
            .find({ seriesId})
            .assign(seriesInfo)
            .write()

        return tvSeries.topTwentyEpisodes
    }
}

export {
    getSeriesTopEpisodes
}

