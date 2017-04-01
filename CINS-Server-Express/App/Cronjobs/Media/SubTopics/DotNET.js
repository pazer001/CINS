const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class DotNET {
    constructor(subTopics) {
        this.topicName  =   'DotNET';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async azureWebsites() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://webdevblogs.azurewebsites.net/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('article').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('time').prop('datetime'),
                    Title: $(this).find('h2').find('a').text(),
                    Description: $(this).find('.articleBody').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Azure Websites',
                    Url: $(this).find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

module.exports = DotNET;