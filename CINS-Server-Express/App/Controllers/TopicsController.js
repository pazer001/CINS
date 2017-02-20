const TopicsModel   =   require('../Models/TopicsModel');

class TopicsController {
    async getAllTopics() {
        let data            =   {},
            getAllTopics    =  await TopicsModel.getAllTopics();
        if(getAllTopics.rows) {
            for(let subTopic of getAllTopics.rows) {
                if(!data[subTopic.maintopics]) data[subTopic.maintopics] = [];
                data[subTopic.maintopics].push(subTopic)
            }
        }
        return data;
    }

    async getMedia(Id) {
        let data            =   {},
            getVideos    =  await TopicsModel.getMedia(Id);
        return getVideos.rows;
    }

    async getLatestMedia(userId) {
        let getLatestMedia    =  await TopicsModel.getLatestMedia(userId);

        if(getLatestMedia && getLatestMedia.rowCount) {
            return getLatestMedia.rows;
        } else {
            return null;
        }
    }

}

module.exports  =   new TopicsController();