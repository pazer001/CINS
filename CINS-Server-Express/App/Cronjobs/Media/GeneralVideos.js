const cheerio = require('cheerio');
const Utils = require('../../Utils/Utils');
const TopicsModel = require('../../Models/TopicsModel')
const YouTube = require('youtube-node');
const moment = require('moment');

const YOUTUBE_KEY = `AIzaSyAxnEEv4XhBz25KyiGRnb8BGOCFi9_dDV8`;
const YOUTUBE_SETTINGS = {
    relevanceLanguage: 'en',
    order: 'relevance',
    type: 'video',
    videoEmbeddable: 'true',
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

    async youtube() {
        var self = this;
        return new Promise(async function (resolve) {

            let mediaUrls = [];

            var getAllTopics = await TopicsModel.getAllTopics();

            if (getAllTopics.rows) {
                for (let subTopic of getAllTopics.rows) {
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
            // console.log(mediaUrls)
            resolve(mediaUrls)
        })
    }
}

const generalVideos = new GeneralVideos();
module.exports = generalVideos;