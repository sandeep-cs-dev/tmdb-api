import { expect } from 'chai';
import * as tmdbapi from '../../src/services/tmdbapi/tmdb-api'
import { loadEnv } from '../../src/config/env'
import nock from 'nock'
import * as tvSeriesData from "./tvseries.response.json";
import * as tvSeriesSeasonEpisodes from './tvseries-seasondata.json'
let tvSeries = {
    "seriesId": "60735",
    "name": "The Flash"
}
let seasonEpisodes: any
let apiKey:string;
before(function (done) {
    nock.cleanAll()
    loadEnv()
   apiKey = process.env.TMDB_API_KEY
    done()
})


describe("TvSeries", function () {

    beforeEach(function () {
 
        nock('http://api.themoviedb.org/3')
            .get(`/tv/60735?api_key=${apiKey}`)
            .reply(200, tvSeriesData);
    })

    it("should return tv series details for valid tv id", async function () {

        let tvSeriesResult = await tmdbapi.getTvSeries(tvSeries.seriesId)

        expect(tvSeriesResult).to.have.property('seriesId')
        expect(tvSeriesResult).to.have.property('seasons')
        expect(tvSeriesResult.seasons).to.be.an('array')
        expect(tvSeriesResult.seriesId).to.be.equal('60735')
    })

});

describe("TvSeriesSeasons", function () {


    beforeEach(function () {
        nock('http://api.themoviedb.org/3')
            .get(`/tv/60735/season/1?api_key=${apiKey}`)
            .reply(200, tvSeriesSeasonEpisodes);
    })

    it("should return all episodes details for valid tv id and season number", async function () {
        seasonEpisodes = await tmdbapi.getAllEpisodesForSeason(tvSeries.seriesId, 1)
        expect(seasonEpisodes).to.be.an('array')

    })

    it("should have desired properties", function () {

        if (seasonEpisodes.length > 0) {
            let epiode1 = seasonEpisodes[0]
            expect(epiode1).to.have.property('episodeNumber')
            expect(epiode1).to.have.property('episodeName')
            expect(epiode1).to.have.property('averageVotes')
        }

    })
});

after(function(done){
    nock.cleanAll()
    done()
})