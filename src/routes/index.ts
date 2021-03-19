import express from "express";
const router = express.Router();
import {getTopEpisodes} from '../controllers/tvseries/tv-series-seasons'
import {getPopularTvSeries} from '../controllers/tvseries/tv-series-analytics'
router.get('/topEpisodes/:seriesId',getTopEpisodes)
router.get('/analytics/popularSeries',getPopularTvSeries)
export {router}