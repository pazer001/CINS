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
                        PublishedAt: $(this).find('p').first().text().split('...')[0],
                        Title: $(this).find('a').text(),
                        Description: $(this).find('p').first().text().split('...')[2],
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
                        PublishedAt: moment().format(),
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
                        PublishedAt:moment().format(),
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
            subTopics.rows.forEach(async function(subTopic) {
                if(!subTopic.Reddit) return;
                let url = `https://www.reddit.com/r/${subTopic.Reddit}/new/`;
                let html = await Utils.request(url);
                if(!html) throw url;
                var $ = cheerio.load(html);
                $('#siteTable').find('.thing').filter(function() {
                    if($(this).find('.entry').find('.title').find('a').prop('href').includes('reddit.com') || $(this).find('.entry').find('.title').find('a').prop('href').includes('stackoverflow.com')) return;
                    mediaUrls.push({
                        PublishedAt: $(this).find('.tagline').find('time').prop('datetime'),
                        Title: $(this).find('.entry').find('.title').find('a').text().trim(),
                        Description: null,
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: subTopic.Id,
                        Source: 'Reddit',
                        Url: $(this).find('.entry').find('.title').find('a').prop('href').startsWith('http') ? $(this).find('.entry').find('.title').find('a').prop('href') : `https://www.reddit.com${$(this).find('.entry').find('.title').find('a').prop('href')}`,
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