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



40:65:a3:2e:99:e8
192.168.1.14

ee:d7:2b:5f:a6:6a
192.168.1.16

b2:ec:2c:50:78:e0
192.168.1.18

78:24:af:8f:a6:d7
192.168.1.20

00:0c:29:50:43:58
192.168.1.38
