const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Angular {
    async angular() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://angular.io/news.html`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.article-card').filter(function() {
                if(!$(this).find('p').text() || !$(this).find('.date').text()) return;
                mediaUrls.push({
                    PublishedAt: $(this).find('.date').text(),
                    Title: $(this).find('.title').find('a').text(),
                    Description: $(this).find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 20,
                    Source: 'Angular',
                    Url: $(this).find('.title').find('a').attr('href'),
                    Type: 'Article'
                })
            });

            resolve(mediaUrls);
        })
    }

    async angualrTwitter() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://twitter.com/angular`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.stream-container').find('.stream').find('ol').find('li').find('.tweet').find('.content').filter(function () {
                mediaUrls.push({
                    PublishedAt: `${$(this).find('.stream-item-header').find('.time').find('a').find('span').text()}, ${new Date().getFullYear()}`,
                    Title: $(this).find('.js-tweet-text-container').find('p').text().split('http')[0],
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 20,
                    Source: 'Angular Twitter',
                    Url: $(this).find('.js-media-container').find('div').first().prop('data-card-url'),
                    Type: 'Article'
                })
            });

            resolve(mediaUrls);
        })
    }

    async blogspot() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://angularjs.blogspot.co.il/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.main-outer').find('.date-outer').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.date-header').find('span').text().trim(),
                    Title: $(this).find('h3').find('a').text().trim(),
                    Description: $(this).find('.post-body').find('div').first().text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 20,
                    Source: `Blogspot`,
                    Url: $(this).find('h3').find('a').prop('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });

            resolve(mediaUrls);
        })
    }

    async angularNews() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://angular.jsnews.io/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#main').find('.post').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: $(this).find('time').prop('datetime') || null,
                    Title: $(this).find('.entry-title').find('a').text(),
                    Description: $(this).find('.entry-content').find('p').first().text().trim(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 20,
                    Source: 'Angular News',
                    Url: $(this).find('.entry-title').find('a').prop('href'),
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
            let url = `https://www.tutorialspoint.com/angular2/`;
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
                    SubTopicsId: 20,
                    Source: 'Tutorials Point',
                    Url: `${`https://www.tutorialspoint.com/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });

            resolve(mediaUrls);
        })
    }

    async thoughtram() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://blog.thoughtram.io/exploring-angular-2/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.thtrm-article-card-content').filter(function () {
                mediaUrls.push({
                    PublishedAt: null,
                    Title: $(this).find('h2').text().trim(),
                    Description: $(this).find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 20,
                    Source: 'Thoughtram',
                    Url: `https://blog.thoughtram.io/${$(this).find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

const angular = new Angular();
module.exports = angular;