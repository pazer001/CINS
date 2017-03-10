const Logger        =   require('../Utils/Logger');
const TopicsModel   =   require('../Models/TopicsModel');

class TopicsController {
    async getAllTopics() {
        try {
            let getAllTopics    =  await TopicsModel.getAllTopics();
            let data            =   {};
            if(getAllTopics.rows) {
                for(let subTopic of getAllTopics.rows) {
                    if(!data[subTopic.maintopics]) data[subTopic.maintopics] = [];
                    data[subTopic.maintopics].push(subTopic)
                }
            }
            return data;
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }
    }

}

module.exports  =   new TopicsController();