import { Request, Response, NextFunction } from "express";
import { asyncHandler } from '../../util/asycnHandler'
import { getSeriesTopEpisodes } from "../../services/tvseries/tvseries";

const getTopEpisodes = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let seriesId: string = req.params.seriesId
    let result = await getSeriesTopEpisodes(seriesId)
    res.status(200).json({ seriesId, episodes: result })
});

export {
    getTopEpisodes
}

