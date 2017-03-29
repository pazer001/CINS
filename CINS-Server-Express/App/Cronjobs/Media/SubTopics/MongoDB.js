const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class MongoDB {
    constructor(subTopics) {
        this.topicName  =   'MongoDB';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }

    async mongoDB() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://www.mongodb.com/news`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.animation--fadezoom-in').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.font--light-green').text(),
                    Title: $(this).find('.margin--top-none').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: $(this).find('strong').text(),
                    Url: $(this).find('.no-decor').prop('href'),
                    Type: 'Article'
                })
            });
            console.log(mediaUrls)
            resolve(mediaUrls);
        })
    }
}

module.exports = MongoDB;