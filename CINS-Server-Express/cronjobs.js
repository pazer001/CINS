const config        =   require('config.json');
const fetch         =   require('node-fetch');
const fs            =   require('fs');
const request       =   require('request');
const cheerio       =   require('cheerio');
const YouTube       =   require('youtube-node');
const google        =   require('google')
const pg            =   require('pg');
const moment        =   require('moment');
const TopicsModel   =   require('./Models/TopicsModel');
const Logger        =   require('./Utils/Logger');

const YOUTUBE_KEY = `AIzaSyAxnEEv4XhBz25KyiGRnb8BGOCFi9_dDV8`;

class Cronjobs {
    constructor() {
        this.pgClient = new pg.Pool(config[process.env.NODE_ENV].PostgreSQL);
        this.pgClient.connect();
    }

    insertMedia(media) {
        let data = [
            media.PublishedAt,
            media.Title,
            media.Description,
            media.ImageUrl || null,
            media.ImageWidth || null,
            media.ImageHeight || null,
            media.SubTopicsId,
            media.Source,
            media.Url,
            media.Type
        ];

        if(!media.Url || !media.Title) return;

        console.log(media.Source, media.Title)

        const query = `INSERT INTO "CINS"."Media"
                                        ("PublishedAt", "Title", "Description", "ImageUrl", "ImageWidth", "ImageHeight", "SubTopicsId", "Source", "Url", "Type")
                                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                                        ON CONFLICT ("Url") DO NOTHING`;

        this.pgClient.query(query, data, (error, result) => {
            if (error) Logger.toDB(JSON.stringify(error), query, JSON.stringify(data));
        });
    }

    async getYoutube() {
        var self = this;
        let settings = {
            relevanceLanguage: 'en',
            order: 'relevance',
            type: 'video',
            videoEmbeddable: 'true',
            publishedAfter: moment.utc().subtract(1, 'months').format()
        };

        var getAllTopics = await TopicsModel.getAllTopics();

        if (getAllTopics.rows) {
            for (let subTopic of getAllTopics.rows) {
                if (subTopic.SearchTerm) {
                    let youTube = new YouTube();
                    youTube.setKey(YOUTUBE_KEY);
                    youTube.search(`${subTopic.SearchTerm}`, 10, function (error, result) {
                        if (error) Logger.toDB(error);
                        result.items.forEach(item => {
                            let media   =   {
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
                            };
                            self.insertMedia(media)
                        });
                    }, settings);
                }
            }
        }
    }

    getMediumArticles(subTopic) {
        let self    =   this;
        request(`https://medium.com/search?q=${subTopic.SearchTerm || subTopic.Name}`, (err, response, html) => {
            var $ = cheerio.load(html);
            $('.js-postListHandle').find('.js-block').find('.postArticle').filter(function() {
                let media   =   {
                    PublishedAt: $(this).find('.postMetaInline').find('time').text(),
                    Title: $(this).find('h3').text(),
                    Description: $(this).find('.graf').text(),
                    SubTopicsId: subTopic.Id || 0,
                    Source: 'Medium',
                    Url: $(this).find('.postArticle-content').find('a').first().attr('href'),
                    ImageUrl: '',
                    Type: 'Article'
                }
                self.insertMedia(media)
            });
        })
    }

    getDavidwalshArticles(subTopic) {
        let self    =   this;
        request(`https://davidwalsh.name/?s=${subTopic.Name}`, (err, response, html) => {
            var $ = cheerio.load(html);
            $('#main').find('.post-list').find('li').filter(function() {
                let media   =   {
                    PublishedAt: $(this).find('.meta').find('time').text(),
                    Title: $(this).find('.preview').find('h2').find('a').text(),
                    Description: $(this).find('.preview').find('p').find('a').text(),
                    SubTopicsId: subTopic.Id || 0,
                    Source: 'David Walsh',
                    Url: $(this).find('.preview').find('h2').find('a').attr('href'),
                    ImageUrl: $(this).find('.post-image').attr('src'),
                    Type: 'Article'
                }
                self.insertMedia(media)
            });
        })
    }

    getScotchArticles(subTopic) {
        let self    =   this;
        request.post(`https://4krgxptf7k-dsn.algolia.net/1/indexes/posts_production/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.18.1&x-algolia-application-id=4KRGXPTF7K&x-algolia-api-key=4594f3b07157188f25b3f5a8a7eba04e`, {"form": JSON.stringify({"params":`query=${subTopic.Name}&facets=*&facetFilters=%5B%22status%3Apublished%22%2C%22is_spam%3A0%22%5D&hitsPerPage=12&page=0`})},  (err, response, html) => {
            var $ = cheerio.load(html);
            JSON.parse(response.body).hits.forEach(article => {
                let media   =   {
                    PublishedAt: article.created_at,
                    Title: article.title,
                    Description: article.description,
                    SubTopicsId: subTopic.Id,
                    Source: 'Scotch',
                    Url: article.published_url,
                    ImageUrl: article.image,
                    Type: 'Article'
                };
                self.insertMedia(media);
            });
        })
    }

    getCssTricksArticles(subTopic) {
        let self    =   this;
        request(`https://css-tricks.com/`, (err, response, html) => {
            var $ = cheerio.load(html);
            $('article.article-card').filter(function() {
                let media   =   {
                        PublishedAt: $(this).find('time').attr('datetime'),
                        Title: $(this).find('.article-card-title').find('h2').find('a').text().trim(),
                        Description: $(this).find('.text-block').find('p').first().text(),
                        SubTopicsId: 26,
                        Source: 'CSS Tricks',
                        Url: $(this).find('.article-card-title').find('h2').find('a').attr('href'),
                        ImageUrl: $(this).find('.wp-post-image').attr('src'),
                        Type: 'Article'
                    };

                self.insertMedia(media);
            });
        })
    }

    getFreecodecampArticles(subTopic) {
        let self    =   this;
        request(`https://medium.freecodecamp.com/search?q=${subTopic.Name}`, (err, response, html) => {
            var $ = cheerio.load(html);
            $('.js-postListHandle').find('.postArticle').filter(function() {
                let media   =   {
                    PublishedAt: $(this).find('time').attr('datetime'),
                    Title: $(this).find('.section-inner').find('h3').text().trim(),
                    Description: $(this).find('.section-inner').find('h4').text().trim() || $(this).find('.section-inner').find('p').text().trim(),
                    SubTopicsId: subTopic.Id,
                    Source: 'Free Code Camp',
                    Url: $(this).find('.postArticle-readMore').find('a').attr('href'),
                    ImageUrl: $(this).find('.postArticle-content').find('.section-inner').find('figure').find('.graf-image').attr('src'),
                    ImageWidth: $(this).find('.postArticle-content').find('.section-inner').find('figure').find('.graf-image').data('width'),
                    ImageHeight: $(this).find('.postArticle-content').find('.section-inner').find('figure').find('.graf-image').data('height'),
                    Type: 'Article'
                };
                self.insertMedia(media);
            });
        })
    }

    async getArticles() {
        var getAllTopics = await TopicsModel.getAllTopics();

        if (getAllTopics.rows) {
            for (let subTopic of getAllTopics.rows) {

                    this.getScotchArticles(subTopic);
                    this.getMediumArticles(subTopic);
                    this.getDavidwalshArticles(subTopic);
                    this.getFreecodecampArticles(subTopic);
            }
        }

        this.getCssTricksArticles();

    }
}

const cronjobs = new Cronjobs();
cronjobs.getArticles();
cronjobs.getYoutube();
setInterval(() => {
    cronjobs.getArticles();
    cronjobs.getYoutube();
}, 3600000);