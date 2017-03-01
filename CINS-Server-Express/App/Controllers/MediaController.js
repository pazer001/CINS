const MediaModel   =   require('../Models/MediaModel');

class MediaController {
    async rateMedia(req, mediaId) {
        if(req.session.rateMedia && req.session.rateMedia[mediaId]) {
            return {
                code: 401,
                ratedMediaCount: await this.ratedMediaCount(mediaId),
                message: 'Media Already Rated'
            }
        }
        let rateMedia   =   await MediaModel.rateMedia(mediaId);
        if(rateMedia.rowCount) {
            req.session.rateMedia   =   {};
            req.session.rateMedia[mediaId] = true;
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
    }

    async ratedMediaCount(mediaId) {
        let ratedMediaCount     =   await MediaModel.ratedMediaCount(mediaId);

        if(ratedMediaCount && ratedMediaCount.rowCount) {
            return ratedMediaCount.rows.pop().RatingCount;
        } else {
            return 0
        }
    }

    async search(term) {
        let search     =   await MediaModel.search(term);

        if(search && search.rowCount) {
            return search.rows;
        } else {
            return null;
        }
    }

    async requestMedia(data) {
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
    }

    async getMedia(Id) {
        let data            =   {},
            getVideos    =  await MediaModel.getMedia(Id);
        return getVideos.rows;
    }

    async getLatestMedia(userId) {
        let getLatestMedia    =  await MediaModel.getLatestMedia(userId);

        if(getLatestMedia && getLatestMedia.rowCount) {
            return getLatestMedia.rows;
        } else {
            return null;
        }
    }
}

module.exports  =   new MediaController();