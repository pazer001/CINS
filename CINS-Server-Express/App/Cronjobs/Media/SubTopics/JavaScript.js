const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class JavaScript {
    async javascript() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://www.javascript.com/news`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.sb-bucket-content').filter(function() {
                if(!$(this).find('p').find('a').prop('href')) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('p').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 36,
                    Source: 'JavaScript.com',
                    Url: `https://www.javascript.com${$(this).find('p').find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async echoJs() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.echojs.com/latest/0`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('article').filter(function() {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('h2').find('a').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 36,
                    Source: $(this).find('address').text().replace('at', '').trim(),
                    Url: $(this).find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async jsOrg() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://news.js.org/?latest`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('#main').find('article').filter(function() {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('.head').find('h2').find('a').text(),
                    Description: $(this).find('.body').text().trim() || null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 36,
                    Source: $(this).find('.meta').find('.host').text() || 'JS.ORG',
                    Url: $(this).find('.head').find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async jsLive() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://jslive.com/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.posts').find('article').filter(function() {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('.body').find('h1').find('a').text(),
                    Description: $(this).find('.body').find('p').text().trim() || null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 36,
                    Source: $(this).find('.source').text().trim() || 'JS Live',
                    Url: $(this).find('.body').find('h1').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

}

const javaScript = new JavaScript();
module.exports = javaScript;