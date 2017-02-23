const cheerio = require('cheerio');
const Utils = require('../../Utils/Utils');
const moment    =   require('moment');
const fs        =   require('fs');

class GeneralArticles {
    async medium(subTopics) {
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                let url = `https://medium.com/search?q=${subTopic.SearchTerm || subTopic.Name}`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('.js-postListHandle').find('.js-block').find('.postArticle').filter(function() {
                    mediaUrls.push({
                        PublishedAt: $(this).find('.postMetaInline').find('time').prop('datetime'),
                        Title: $(this).find('h3').text(),
                        Description: $(this).find('.graf').text(),
                        ImageUrl: $(this).find('figure').find('img').first().prop('src') || null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: 'Medium',
                        Url: $(this).find('.postArticle-content').find('a').first().attr('href'),
                        Type: 'Article'
                    });

                });
            });
            setTimeout(() => {resolve(mediaUrls)}, 5000)
        })
    }

    async techbeacon(subTopics) {
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                let url = `https://techbeacon.com/search?&keyword=${subTopic.SearchTerm || subTopic.Name}`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('.article-result').filter(function() {
                    mediaUrls.push({
                        PublishedAt: $(this).find('.metadata').find('.date').text(),
                        Title: $(this).find('.node-title').find('a').text(),
                        Description: $(this).find('.description').text().split('-').slice(1,10).join(''),
                        ImageUrl: $(this).find('.article-image').find('img').prop('src') || null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: 'Tech Beacon',
                        Url: `https://techbeacon.com${$(this).find('.node-title').find('a').attr('href')}`,
                        Type: 'Article'
                    });

                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 5000)
        })
    }

    async infoq(subTopics) {
        return new Promise(async function(resolve) {
            let sstHtml     =   await Utils.request('https://www.infoq.com/');
            let sstHtmlParsed         =   cheerio.load(sstHtml);
            let sst     =   sstHtmlParsed('#search').find('[name="sst"]').val();
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                let url = `https://www.infoq.com/search.action?queryString=${subTopic.Name}&page=1&searchOrder=date&sst=${sst}`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                // console.log(url)
                $('.one_result').filter(function() {
                    mediaUrls.push({
                        PublishedAt: $(this).find('p').text().split('...')[0],
                        Title: $(this).find('a').text(),
                        Description: $(this).find('p').text().split('...')[2],
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: 'InfoQ',
                        Url: $(this).find('a').prop('href'),
                        Type: 'Article'
                    });

                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 10000)
        })
    }

    async rayWenderlich(subTopics) {
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                let url = `https://www.raywenderlich.com/?s=${subTopic.Name}`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('#content').find('article').filter(function() {
                    if(!subTopic.Id) return;
                    mediaUrls.push({
                        PublishedAt: moment().format(),
                        Title: $(this).find('.entry-title').find('a').text(),
                        Description: $(this).find('.search-content').text(),
                        ImageUrl: $(this).find('.search-content').find('figure').find('img').prop('src'),
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: 'Ray Wenderlich',
                        Url: $(this).find('.entry-title').find('a').prop('href'),
                        Type: 'Article'
                    });

                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 10000)
        })
    }

    async frontendEront(subTopics) {
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                if(subTopic.maintopics !== 'Web Development') return;
                let url = `https://frontendfront.com/?s=${subTopic.Name}`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('.stories').find('li').filter(function() {
                    mediaUrls.push({
                        PublishedAt: moment().format(),
                        Title: $(this).find('h2').find('a').text(),
                        Description: null,
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: 'Frontend Front',
                        Url: $(this).find('h2').find('a').prop('href'),
                        Type: 'Article'
                    });

                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 10000)
        })
    }




}

const generalArticles = new GeneralArticles();
module.exports = generalArticles;