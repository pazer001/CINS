const cheerio   =   require('cheerio');
const Utils     =   require('../../Utils/Utils');
const moment    =   require('moment');
const fs        =   require('fs');

class GeneralArticles {
    async medium(subTopics) {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                if(!subTopic.Medium) return;
                let url = `https://medium.com/tag/${subTopic.Medium}`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('.streamItem-card').filter(function() {
                    mediaUrls.push({
                        PublishedAt: $(this).find('time').prop('datetime'),
                        Title: $(this).find('.section-inner').find('h3').text(),
                        Description: $(this).find('.section-inner').find('p').text(),
                        SubTopicsId: subTopic.Id,
                        Source: 'Medium',
                        Url: $(this).find('.postArticle-readMore').find('a').prop('href'),
                        Type: 'Article'
                    });
                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 10000)
        })
    }

    async techbeacon(subTopics) {
        Utils.printFunctionName();
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
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                if(!subTopic.Infoq) return;
                let url = `https://www.infoq.com/${subTopic.Infoq}`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('.articles').find('p').filter(function() {
                    mediaUrls.push({
                        PublishedAt: $(this).find('.about_general').text().trim().split(' on\n')[1].trim().split('\n')[0],
                        Title: $(this).find('.art_title').text(),
                        Description: null,
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: $(this).find('.story-title').find('.domain').text().trim(),
                        Url: `https://www.infoq.com/${$(this).find('.art_title').prop('href')}`,
                        Type: 'Article'
                    });
                });

                $('.news').find('span').filter(function() {
                    if(!$(this).find('.about_general').text()) return;
                    mediaUrls.push({
                        PublishedAt: $(this).find('.about_general').text().trim().split(' on\n')[1].trim().split('\n')[0],
                        Title: $(this).find('.art_title').text(),
                        Description: null,
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: $(this).find('.story-title').find('.domain').text().trim(),
                        Url: `https://www.infoq.com/${$(this).find('.art_title').prop('href')}`,
                        Type: 'Article'
                    });
                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 10000)
        })
    }


    async frontendFront(subTopics) {
        Utils.printFunctionName();
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
                        PublishedAt: $(this).find('.meta').find('time').prop('datetime'),
                        Title: $(this).find('h2').find('a').text(),
                        Description: null,
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: $(this).find('.story-title').find('.domain').text().trim(),
                        Url: $(this).find('h2').find('a').prop('href'),
                        Type: 'Article'
                    });

                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 10000)
        })
    }

    async infoWorld(subTopics) {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                if(!subTopic.InfoWorld) return;
                let url = `http://www.infoworld.com/search?contentType=article%2Cresource&query=${subTopic.InfoWorld}&s=d`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('.post-cont').filter(function() {
                    mediaUrls.push({
                        PublishedAt: $(this).find('.byline').text().split(',')[2] || null,
                        Title: $(this).find('h3').find('a').text(),
                        Description: $(this).find('.summary').text(),
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: 'Info World',
                        Url: `http://www.infoworld.com/${$(this).find('h3').find('a').prop('href')}`,
                        Type: 'Article'
                    });
                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 10000)
        })
    }

    async sitepoint(subTopics) {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            subTopics.rows.forEach(async function(subTopic) {
                let url = `https://www.sitepoint.com/?s=${subTopic.Name}`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('.search-results-item').filter(function() {
                    mediaUrls.push({
                        PublishedAt: $(this).find('.article_pub-date').find('time').prop('datetime'),
                        Title: $(this).find('.article_title').find('a').text().trim(),
                        Description: $(this).find('.article_excerpt').text().trim(),
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: 'Sitepoint',
                        Url: $(this).find('.article_title').find('a').prop('href'),
                        Type: 'Article'
                    });
                });
            });
            setTimeout(() => {resolve(mediaUrls); }, 10000)
        })
    }

    async reddit(subTopics) {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            //Ugly patch to add angular 2 media from reddit
            subTopics.rows.push({Reddit: 'Angular2', Id:16});
            subTopics.rows.forEach(async function(subTopic) {
                if(!subTopic.Reddit) return;
                let url = `https://www.reddit.com/r/${subTopic.Reddit}/new/`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('#siteTable').find('.thing').filter(function() {
                    if(!$(this).find('.entry').find('.title').find('a').prop('href').includes('http') || $(this).find('.entry').find('.title').find('a').prop('href').includes('stackoverflow.com')) return;
                    mediaUrls.push({
                        PublishedAt: $(this).find('.tagline').find('time').prop('datetime'),
                        Title: $(this).find('.entry').find('.title').find('a.title').text().trim().split('(')[0],
                        Description: null,
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: $(this).find('.entry').find('.title').find('a').prop('href').replace('http://', '').replace('https://', '').replace('www.', '').split('/')[0],
                        Url: $(this).find('.entry').find('.title').find('a').prop('href'),
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