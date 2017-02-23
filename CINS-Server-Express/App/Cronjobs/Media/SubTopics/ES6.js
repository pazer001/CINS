const cheerio = require('cheerio');
const Utils = require('../../../Utils/Utils');
const moment    =   require('moment');
const fs        =   require('fs');

class ES6 {
    async es6Features() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://es6-features.org/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.nav').find('a').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).text().trim(),
                    Description: $(`#${$(this).prop('href').replace('#', '')}`).find('.desc').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 30,
                    Source: 'Es6 Features',
                    Url: `${url}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            
            resolve(mediaUrls);
        })
    }

    async exploringjs() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://exploringjs.com/es6/index.html`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.toc').find('a').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).text().trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 30,
                    Source: 'Exploring Js',
                    Url: `${`http://exploringjs.com/es6/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async babel() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://ccoenraets.github.io/es6-tutorial/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.container').find('ul').find('li').find('a').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).text().trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 30,
                    Source: 'Babel',
                    Url: `${`http://ccoenraets.github.io`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async qnimate() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://qnimate.com/post-series/ecmascript-6-complete-tutorial/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.qnimate-post-series').find('li').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('h3').find('span').text().trim(),
                    Description: $(this).find('.qnimate-post-series-box2').find('p').text().replace('Continue Reading', ''),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 30,
                    Source: 'Qnimate',
                    Url: $(this).find('.qnimate-post-series-box2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async nczOnline() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://www.nczonline.net/blog/tag/ecmascript-6/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.post-content').find('li').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: $(this).find('small').text(),
                    Title: $(this).find('a').text().trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 30,
                    Source: 'NCZ Online',
                    Url: `${`https://www.nczonline.net/`}${$(this).find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async tutorialsPoint() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://www.tutorialspoint.com/es6/index.htm`;
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
                    SubTopicsId: 30,
                    Source: 'Tutorials Point',
                    Url: `${`https://www.tutorialspoint.com/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async mozilla() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://hacks.mozilla.org/category/es6-in-depth/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#content-main').find('.article-list').find('.list-item').filter(function () {
                mediaUrls.push({
                    PublishedAt: $(this).find('.post__meta').find('abbr').prop('title'),
                    Title: $(this).find('h3').find('a').text().trim(),
                    Description: $(this).find('.post__tease').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 30,
                    Source: 'Mozilla',
                    Url: $(this).find('h3').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async jsNext() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://chimera.labs.oreilly.com/books/1234000001623/index.html`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.toc').find('a').filter(function () {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).text().trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 30,
                    Source: 'JS.next',
                    Url: `${`http://chimera.labs.oreilly.com/books/1234000001623/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async youDontKnowJS() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.entry-content').find('ul').find('li').find('a').filter(function () {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).text().trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 30,
                    Source: 'You Dont Know JS',
                    Url: `${`https://github.com/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            
            resolve(mediaUrls);
        })
    }
}

const es6 = new ES6();
module.exports = es6;