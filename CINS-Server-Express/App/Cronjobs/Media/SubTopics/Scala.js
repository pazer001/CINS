const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Scala {
    constructor(subTopics) {
        this.topicName  =   'Scala';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async scala() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://www.scala-lang.org/news/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.main-page-column').find('li').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.news-archive-date').text(),
                    Title: $(this).find('b').find('a').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Scala News',
                    Url: `https://www.scala-lang.org/news/${$(this).find('b').find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }


}

module.exports = Scala;