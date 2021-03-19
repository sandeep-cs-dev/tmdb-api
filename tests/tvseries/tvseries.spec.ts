

import { expect } from 'chai';
import * as tvSeriesService from '../../src/services/tvseries/tvseries'
import { loadEnv } from '../../src/config/env'
import sinon from 'sinon'
import * as episodes from './allepisodes.mock.json'
before(function (done) {

    loadEnv()
    sinon.stub(tvSeriesService, 'getSeriesAllEpisodes').returns(Promise.resolve(
        episodes
    ))
    done()
})

let topEpisodes: any

let flash = {
    "seriesId": "60735",
    "name": "The Flash"
}

describe("TvSeriesTopEpisodes", function () {

    it("should return top Episodes as an array for a given series(tv id) ", async function () {

        topEpisodes = await tvSeriesService.getSeriesTopEpisodes(flash.seriesId)
        expect(topEpisodes).to.be.an('array')

    })

    it("Top 20 Episodes should have desired entries ", function () {

        //  [{
        //     "episodeNumber": ,
        //     "averageVotes": ,
        //     "episodeName": ""
        //   }]
        if (topEpisodes.length > 0) {
            let episode = topEpisodes[0];
            expect(episode).to.have.property('episodeNumber')
            expect(episode).to.have.property('averageVotes')
            expect(episode).to.have.property('episodeName')
        }
    })

    it("result should be in desending order", function () {

        let check = true;
        if (topEpisodes.length > 1) {
            for (let i = 1; i < topEpisodes.length; i++) {
                if (topEpisodes[i].averageVotes > topEpisodes[i - 1]) {
                    check = false
                    break
                }
            }
            expect(check).to.be.equal(true)
        }
    })


});