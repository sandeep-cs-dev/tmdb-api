import { Request, Response } from "express";
import { getPopularSeries } from "../../services/tvseries/analytics";
import { asyncHandler } from '../../util/asycnHandler'

const getPopularTvSeries = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    let topFiveSeries = await getPopularSeries()
    res.status(200).json(topFiveSeries)
});
export {
    getPopularTvSeries
}

