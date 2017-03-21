const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Clojure {
    constructor(subTopics) {
        this.topicName  =   'Clojure';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async clojureNews() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://clojure.news/entry/newest/p/1`;
            let json = JSON.parse(await Utils.request(url));
            json['newest-entry'].forEach(news => {
                mediaUrls.push({
                    PublishedAt: news['created-date'],
                    Title: news['title'],
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Clojure News',
                    Url: news['url'],
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async planetClosure() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://planet.clojure.in/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#main-content').find('.entry').filter(function () {
                let media = {
                    PublishedAt: $(this).find('aside').find('p').text().replace('Feed URL').split("\n")[1].trim(),
                    Title: $(this).find('article').find('h2').find('a').text().trim(),
                    Description: $(this).find('article').find('p').eq(1).text().trim(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 4,
                    Source: 'Planet Closure',
                    Url: $(this).find('article').find('h2').find('a').prop('href'),
                    Type: 'Article'
                };
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }
}

module.exports = Clojure;