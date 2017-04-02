const cheerio       =   require('cheerio');
const Utils         =   require('../../Utils/Utils');
const TopicsModel   =   require('../../Models/TopicsModel')
const YouTube       =   require('youtube-node');
const moment        =   require('moment');
const fs            =   require('fs');

const YOUTUBE_KEY = `AIzaSyAxnEEv4XhBz25KyiGRnb8BGOCFi9_dDV8`;
const YOUTUBE_SETTINGS = {
    relevanceLanguage: 'en',
    order: 'relevance',
    type: 'video',
    publishedAfter: moment.utc().subtract(1, 'months').format()
};

class GeneralVideos {
    async youtubeSearch(url, settings, key) {
        return new Promise(resolve => {
            let youTube = new YouTube();
            youTube.setKey(key);
            youTube.search(url, 10, function (error, result) {
                if (error) Logger.toDB(error);
                resolve(result);
            }, settings)
        })
    }

    async youtube(subTopics) {
        Utils.printFunctionName();
        var self = this;
        return new Promise(async function (resolve) {
            let mediaUrls = [];

            if (subTopics.rows) {
                for (let subTopic of subTopics.rows) {
                    if (subTopic.SearchTerm) {
                        let result = await self.youtubeSearch(subTopic.SearchTerm, YOUTUBE_SETTINGS, YOUTUBE_KEY);
                        result.items.forEach(item => {
                            mediaUrls.push({
                                PublishedAt: item.snippet.publishedAt,
                                Title: item.snippet.title,
                                Description: item.snippet.description,
                                ImageUrl: item.snippet.thumbnails.high.url,
                                ImageWidth: item.snippet.thumbnails.high.width,
                                ImageHeight: item.snippet.thumbnails.high.height,
                                SubTopicsId: subTopic.Id,
                                Source: 'Youtube',
                                Url: `https://www.youtube.com/embed/${item.id.videoId}`,
                                Type: 'Video'
                            });
                        });
                    }
                }
            }
            resolve(mediaUrls)
        })
    }

    async egghead(subTopics) {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url =   `https://egghead.io/lessons`;
            let html = await Utils.request(url);
            if(!html) throw url;
            var $ = cheerio.load(html);
            // fs.writeFileSync('temp.html', html)
            $('.lesson-row').filter(function() {
                let fixedTopicsNames    =   [];
                fixedTopicsNames['Js']          =   `JavaScript`;
                fixedTopicsNames['Vue']         =   `VueJS`;
                fixedTopicsNames['Angular2']    =   `Angular`;
                fixedTopicsNames['Angularjs']   =   `Angular`;
                fixedTopicsNames['Rx']          =   `Reactive`;
                fixedTopicsNames['Html5']       =   `HTML`;
                fixedTopicsNames['Postgres']    =   `PostgreSQL`;

                let topic   =   $(this).find('.cell-category-logo').find('a').find('img').prop('alt'),
                    topicId =   subTopics.rows.filter(subTopic => (fixedTopicsNames[topic] || topic) === subTopic.Name)

                if(!topicId.length) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('.cell-lesson-title').find('a').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: topicId[0].Id,
                    Source: `Egghead`,
                    Url: $(this).find('.cell-lesson-title').find('a').prop('href'),
                    Type: 'Video'
                });
                resolve(mediaUrls);
            });
        })
    }
}

const generalVideos = new GeneralVideos();
module.exports = generalVideos;