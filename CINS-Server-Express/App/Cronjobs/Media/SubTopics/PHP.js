const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');
const fs        =   require('fs');

class PHP {
    async phpToday() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://www.phptoday.org/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.posts').find('.item').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.right').find('.meta').find('.left').find('span').find('abbr').prop('title'),
                    Title: $(this).find('.right').find('.link').find('a').text().split('(')[0].trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 51,
                    Source: $(this).find('.right').find('.link').find('a').find('small').text().replace('(', '').replace(')', ''),
                    Url: `https://www.phptoday.org${$(this).find('.right').find('.link').find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async planetPHP() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.planet-php.net/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('#middlecontent').find('.box').filter(function() {
                mediaUrls.push({
                    PublishedAt: null,
                    Title: $(this).find('.blogTitle').text().trim().split('(')[0],
                    Description: $(this).find('.feedcontent').find('p').first().text().trim(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 51,
                    Source: 'Planet PHP',
                    Url: $(this).find('.blogTitle').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async zend() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.zend.com/en/resources/news-and-events/newsroom/ajax-newsroom`;
            let json = JSON.parse(await Utils.request(url));
            json.newsLinks.forEach(v => {
                mediaUrls.push({
                    PublishedAt: v.date,
                    Title: v.title,
                    Description: v.shortDescription,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 51,
                    Source: 'ZEND',
                    Url: `http://www.zend.com${v.link}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async alltop() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://php.alltop.com/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.hentry').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.published').text(),
                    Title: $(this).find('.entry-title').find('a').text().trim(),
                    Description: $(this).find('.full-post').find('.entry-content').find('.entry-bound').text().trim(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 51,
                    Source: 'All Top',
                    Url: $(this).find('.entry-title').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async phpbuilder() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.phpbuilder.com/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('#homepageFeaturedImage').find('.text').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('p').first().find('span').text(),
                    Title: $(this).find('.homepageFeature').find('a').text().trim(),
                    Description: $(this).find('p').eq(1).text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 51,
                    Source: 'PHP Builder',
                    Url: `http://www.phpbuilder.com/${$(this).find('.homepageFeature').find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async tutorialsPoint() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://www.tutorialspoint.com/php/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.sidebar .nav.left-menu').find('a').filter(function () {
                if ($(this).closest('ul').hasClass('push-bottom')) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).text().trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 51,
                    Source: 'Tutorials Point',
                    Url: `${`https://www.tutorialspoint.com/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

const php = new PHP();
module.exports = php;