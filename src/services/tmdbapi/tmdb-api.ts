
import axios, {
    AxiosResponse
} from 'axios'
import { timeStamp } from 'node:console'
import { TvSeries } from '../../models/tvseries'

const fetchDataFromTMDB: Function = async (url: string): Promise<any> => {
    try {
        let result: AxiosResponse = await axios.get(url)
        return result.data
    } catch (err) {
        //console.log("Error while fecthing Data from TMDB", err)
        throw new Error("can not fetch Tv Series Data")
    }
}

const prepareTvSeriesUrl = (seriesId: string): string => {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL
    const TMDB_API_KEY = process.env.TMDB_API_KEY
    let url = `${TMDB_BASE_URL}/tv/${seriesId}?api_key=${TMDB_API_KEY}`
    // console.log("TvSeriesUrl", url);
    return url
}

const prepareTvSeriesSeasonUrl = (seriesId: string, seasonNumber: number): string => {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL
    const TMDB_API_KEY = process.env.TMDB_API_KEY
    let url = `${TMDB_BASE_URL}/tv/${seriesId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}`
    // console.log("TvSeriesSeasonUrl", url);
    return url
}

export const getTvSeries = async (seriesId: string): Promise<TvSeries> => {
    const url = prepareTvSeriesUrl(seriesId);
    let tvSeriesData = await fetchDataFromTMDB(url);
    let seasons: any[] = tvSeriesData.seasons ?? []
    let popularity = tvSeriesData.popularity
    let seriesName = tvSeriesData.name
    seasons = seasons.map((season) => {
        let temp: any = {};
        temp.seasonNumber = season.season_number
        temp.seasonId = season.id
        return temp;
    })
    return { seriesId, seriesName, popularity, seasons }

}

export const getAllEpisodesForSeason = async (seriesId: string, seasonNumber: number) => {

    const url = prepareTvSeriesSeasonUrl(seriesId, seasonNumber);
    let tvSeriesSeasons = await fetchDataFromTMDB(url)
    let _episodes = tvSeriesSeasons.episodes ?? []

    let episodes = _episodes.map((episode: any) => {
        let temp: any = {}
        temp.episodeNumber = episode.episode_number
        temp.averageVotes = episode.vote_average
        temp.episodeName = episode.name
        return temp
    })
    return episodes

}
