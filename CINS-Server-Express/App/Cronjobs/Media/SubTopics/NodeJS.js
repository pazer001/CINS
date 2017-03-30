const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class NodeJS {
    constructor(subTopics) {
        this.topicName  =   'NodeJS';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async risingstack() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://news.risingstack.com/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('article').filter(function() {
                mediaUrls.push({
                    PublishedAt: null,
                    Title: $(this).find('h2').find('a').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: $(this).find('address').text().replace('at').trim(),
                    Url: $(this).find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            console.log(mediaUrls)
            resolve(mediaUrls);
        })
    }
}

module.exports = NodeJS;