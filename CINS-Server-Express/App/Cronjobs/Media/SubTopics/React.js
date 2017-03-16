const cheerio   =   require('cheerio');
const Utils     =   require('../../../Utils/Utils');
const moment    =   require('moment');
const fs        =   require('fs');

class React {
    async reactjsNews() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://reactjsnews.com/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.posts').find('.post').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: $(this).find('.post-meta').text(),
                    Title: $(this).find('a').first().find('h3').text(),
                    Description: $(this).find('p').eq(2).text().trim(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'Reactjs News',
                    Url: `${url}${$(this).find('a').first().attr('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async reactjsNewsIO() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://react.jsnews.io/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#main').find('article').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: $(this).find('time').prop('datetime') / 1000,
                    Title: $(this).find('.entry-title').find('a').text(),
                    Description: $(this).find('.entry-content').find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'ReactJS News IO',
                    Url: $(this).find('.entry-title').find('a').attr('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async reactjsNewsTwitter() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://twitter.com/reactjsnews?lang=en`;
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
                    SubTopicsId: 27,
                    Source: 'ReactJS News Twitter',
                    Url: $(this).find('.js-media-container').find('div').first().prop('data-card-url'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async scotch() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://scotch.io/tag/react`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);

            $('.loopy-loop').find('.card').find('a').each(async function () {
                let url = $(this).prop('href');
                let html2 = await Utils.request(url);
                let $$ = cheerio.load(html2);
                if(!$$('.container').find('.row').find('header').find('h1').text()) return;
                mediaUrls.push({
                    PublishedAt: $$('.container').find('.row').find('.meta-info').find('span').eq(2).text(),
                    Title: $$('.container').find('.row').find('header').find('h1').text(),
                    Description: $$('.container').find('.row').find('header').find('p').text(),
                    ImageUrl: $$('.container').find('.single-wrap').find('.featured-image-guts').find('img').first().data('cfsrc'),
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'Scotch',
                    Url: url,
                    Type: 'Article'
                })
            });
            setTimeout(() => resolve(mediaUrls), 5000);
        })
    }

    async codementor() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://www.codementor.io/reactjs/tutorial`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.content-block').find('.post-link').filter(function () {
                mediaUrls.push({
                    PublishedAt: $(this).find('.article-time').text().replace('&nbsp', '').replace('●', '').trim(),
                    Title: $(this).find('.post-title').text().trim(),
                    Description: $(this).find('.description').text().trim(),
                    ImageUrl: $(this).find('.image').prop('src'),
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'Code Mentor',
                    Url: `https://www.codementor.io${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async tutorialzine() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://tutorialzine.com/?s=react`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.postHolder').find('.post-item').filter(function () {
                mediaUrls.push({
                    PublishedAt: $(this).find('time').prop('datetime'),
                    Title: $(this).find('h3').find('a').find('span').text().trim(),
                    Description: $(this).find('p').text().trim(),
                    ImageUrl: $(this).find('h3').find('img').prop('src'),
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'Tutorial Zine',
                    Url: $(this).find('h3').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async thinkster() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://thinkster.io/topics/react`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);

            $('.ischapter').find('a').each(async function () {
                let url = `https://thinkster.io/${$(this).prop('href')}`;
                let html2 = await Utils.request(url);
                let $$ = cheerio.load(html2);
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $$('h1').first().text(),
                    Description: $$('.content').find('p').first().text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'Thinkster',
                    Url: url,
                    Type: 'Article'
                })
            });
            setTimeout(() => {resolve(mediaUrls)}, 5000);
        })
    }

    async thebluecoder() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://www.thebluecoder.com/category/react/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.blog_post').find('.post_info_wrapper').filter(function () {
                mediaUrls.push({
                    PublishedAt: $(this).find('time').prop('datetime'),
                    Title: $(this).find('h2').find('a').text().trim(),
                    Description: $(this).find('.entry-content').find('p').text().trim(),
                    ImageUrl: $(this).find('h3').find('img').prop('src'),
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'The Blue Coder',
                    Url: $(this).find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async hashbangweekly() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://hashbangweekly.okgrow.com/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('td').filter(function () {
                if(!$(this).find('p').first().find('a').text().trim()) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('p').first().find('a').text().trim(),
                    Description: $(this).find('p').eq(1).text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'Hashbang Weekly',
                    Url: $(this).find('p').first().find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async daveceddia() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://daveceddia.com/archives/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);

            $('#archive').find('a').each(async function () {
                let url = `https://daveceddia.com/${$(this).prop('href')}`;
                let html2 = await Utils.request(url);
                let $$ = cheerio.load(html2);
                mediaUrls.push({
                    PublishedAt: $$('.entry-date').find('time').prop('datetime'),
                    Title: $$('.entry-title').text(),
                    Description: `${$$('.entry-content').find('p').first().text()} ${$$('.entry-content').find('p').eq(2).text()}`,
                    ImageUrl: $$('.entry-content').find('img').first().prop('src') || null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 27,
                    Source: 'Dave Ceddia',
                    Url: url,
                    Type: 'Article'
                })
            });
            setTimeout(() => {resolve(mediaUrls)}, 5000);
        })
    }
}

const react = new React();
module.exports = react;