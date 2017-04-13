const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Xamarin {
    constructor(subTopics) {
        this.topicName  =   'Xamarin';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async xamarin() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://blog.xamarin.com/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.blog-posts').find('a').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.meta > div > div > div').eq(1).find('span').first().text(),
                    Title: $(this).find('h1').text(),
                    Description: $(this).find('.entry-summary').find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Xamarin',
                    Url: $(this).prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }


}

module.exports = Xamarin;