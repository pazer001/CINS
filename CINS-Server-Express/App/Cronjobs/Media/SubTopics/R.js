const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class R {
    constructor(subTopics) {
        this.topicName  =   'R';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }

    async rBloggers() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://www.r-bloggers.com/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('#leftcontent').find('.post').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.date').text(),
                    Title: $(this).find('h2').find('a').text(),
                    Description: $(this).find('.excerpt').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'R Bloggers',
                    Url: $(this).find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

module.exports = R;