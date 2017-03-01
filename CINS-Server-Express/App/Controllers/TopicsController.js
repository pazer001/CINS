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

}

module.exports  =   new TopicsController();