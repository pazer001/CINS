const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Neo4j {
    constructor(subTopics) {
        this.topicName  =   'Neo4j';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }

    async neo4jNews() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://neo4j.com/news/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.news-item').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.byline').text(),
                    Title: $(this).find('h3').find('a').text(),
                    Description: $(this).find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Neo4j',
                    Url: `https://neo4j.com/news/${$(this).find('h3').find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

module.exports = Neo4j;