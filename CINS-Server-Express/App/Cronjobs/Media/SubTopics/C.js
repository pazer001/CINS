const cheerio   =   require('cheerio');
const Utils     =   require('../../../Utils/Utils');

class C {
    constructor(subTopics) {
        this.topicName  =   'C';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async drdobbs() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.drdobbs.com/cpp`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('#content').find('.news').find('h1').filter(function() {
                if(!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: null,
                    Title: $(this).text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Dr. Bobbs',
                    Url: `${`http://www.drdobbs.com`}${$(this).find('a').attr('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })

    }
}

module.exports = C;