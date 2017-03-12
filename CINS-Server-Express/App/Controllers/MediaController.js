const RSS           =   require('rss');
const moment        =   require('moment');
const Logger        =   require('../Utils/Logger');
const MediaModel    =   require('../Models/MediaModel');

class MediaController {
    async rateMedia(req, mediaId) {
        if(req.session.rateMedia && req.session.rateMedia[mediaId]) {
            return {
                code: 401,
                ratedMediaCount: await this.ratedMediaCount(mediaId),
                message: 'Media Already Rated'
            }
        }

        try {
            let rateMedia   =   await MediaModel.rateMedia(mediaId);
            if(rateMedia.rowCount) {
                if(!req.session.rateMedia) req.session.rateMedia = [];
                req.session.rateMedia[mediaId]  =   true;
                return {
                    code: 200,
                    ratedMediaCount: await this.ratedMediaCount(mediaId),
                    message: 'Media Rated Successfully'
                }
            } else {
                return {
                    code: 400,
                    ratedMediaCount: await this.ratedMediaCount(mediaId),
                    message: 'Media Not Rated Successfully'
                }
            }
        } catch (e) {
            Logger.toDB(JSON.stringify(e))
        }

    }

    async ratedMediaCount(mediaId) {
        try {
            let ratedMediaCount     =   await MediaModel.ratedMediaCount(mediaId);

            return (ratedMediaCount && ratedMediaCount.rowCount) ? ratedMediaCount.rows.pop().RatingCount : 0;
        } catch (e) {
            Logger.toDB(JSON.stringify(e))
        }

    }

    async search(term) {
        try {
            let search     =   await MediaModel.search(term);
            return search;
            // return (search && search.rowCount) ? search.rows : null; //From Postgres
        } catch (e) {
            Logger.toDB(JSON.stringify(e))
        }

    }

    async requestMedia(data) {
        try {
            let search     =   await MediaModel.requestMedia(data);
            if(search && search.rowCount) {
                return {
                    code: 200,
                    message: 'Request Media Successfully'
                }
            } else {
                return {
                    code: 400,
                    message: 'Request Media Not Successfully'
                }
            }
        } catch (e) {
            Logger.toDB(JSON.stringify(e))
        }

    }

    async getMedia(Id) {
        try {
            let getVideos    =  await MediaModel.getMedia(Id);
            return getVideos.rows;
        } catch (e) {
            Logger.toDB(JSON.stringify(e))
        }

    }

    async getLatestMedia(userId) {
        try {
            let getLatestMedia    =  await MediaModel.getLatestMedia(userId);
            return (getLatestMedia && getLatestMedia.rowCount) ? getLatestMedia.rows : [];
        } catch (e) {
            Logger.toDB(JSON.stringify(e))
        }
    }

    async rss(userId) {
        try {
            let userMedia   =   await MediaModel.getLatestMedia(userId);
            if(userMedia.rows) {
                let feedOptions = {
                    title: 'CINS - Computer Is Not Sciene',
                    description: 'Computer is not science',
                    webMaster: 'Paz Lazar',
                    language: 'en',
                    ttl: '60',
                    pubDate: moment().format()
                };
                let feed = new RSS(feedOptions);

                for (let media of userMedia.rows) {
                    feed.item({
                        title: media.Title,
                        description: `
                        <b>From:</b> ${media.Source} <br />
                        <b>At:</b> ${media.PublishedAt} <br />
                        ${media.Description || media.Title}
                        `,
                        url: media.Url,
                        date: media.PublishedAt
                    })
                }
                // let xml = feed.xml({indent: true});
                return feed.xml({indent: true});
            } else {
                return '';
            }
        } catch (e) {

        }
    }
}

module.exports  =   new MediaController();