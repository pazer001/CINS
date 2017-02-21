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
            console.log(mediaUrls)
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
            console.log(mediaUrls)
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
            console.log(mediaUrls)
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
            console.log(mediaUrls)
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
            console.log(mediaUrls)
            resolve(mediaUrls);
        })
    }
}

const es6 = new ES6();
module.exports = es6;