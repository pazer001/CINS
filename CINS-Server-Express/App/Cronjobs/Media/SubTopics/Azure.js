const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Azure {
    constructor(subTopics) {
        this.topicName  =   'Azure';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async azure() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://azure.microsoft.com/en-us/blog/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.blog-posts').find('article').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.text-slate07').text(),
                    Title: $(this).find('h3').find('a').text(),
                    Description: $(this).find('[lang="en"]').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Azure Websites',
                    Url: `https://azure.microsoft.com${$(this).find('h3').find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

module.exports = Azure;