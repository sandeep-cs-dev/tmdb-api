import DB from '../../models/db.init'

const getPopularSeries = async (): Promise<any> => {
    let popularTvSeries: any[] = DB.get('analytics')
        .orderBy('accessCount',['desc'])
        .take(5)
        .value()

        //console.log("==",popularTvSeries)
    return popularTvSeries.map((tvseries: any): any => {
        //delete tvseries.seriesId
        return tvseries
    })
}

export {
    getPopularSeries
}

