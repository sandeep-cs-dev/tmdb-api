import  low from "lowdb"
import  FileSync from "lowdb/adapters/FileSync"
import path from 'path'
import { TvSeries } from "./tvseries";
import { TvSeriesSeason} from "./tv-series-season"

interface Analytics {
        seriesId:string
        seriesName:string
        accessCount:number
}

interface Database {
 tvSeries:TvSeries [],
 tvSeriesSeasons: TvSeriesSeason[]
 analytics:Analytics[] 
}
const adapter = new FileSync<Database>(path.join(__dirname, 'db.json'));
let DB= low(adapter)
 
export default DB

