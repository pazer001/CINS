const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class LISP {
    constructor(subTopics) {
        this.topicName  =   'LISP';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async planetLisp() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://planet.lisp.org/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.blosxomTitle').filter(function() {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('a').eq(1).text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Planet LISP',
                    Url: $(this).find('a').eq(1).prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

module.exports = LISP;