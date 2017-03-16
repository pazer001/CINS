const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Aurelia {
    async aurelia() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://blog.aurelia.io/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.post').filter(function() {
                if(!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: $(this).find('time').prop('datetime'),
                    Title: $(this).find('h1').find('a').text(),
                    Description: $(this).find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 17,
                    Source: 'Aurelia',
                    Url: `${url}${$(this).find('h1').find('a').prop('href')}`,
                    Type: 'Article'
                })
            });
            // console.log(mediaUrls)
            resolve(mediaUrls);
        })
    }

    async tutorialsDojo() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://tutorialsdojo.com/aurelia/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.mega-menu').find('li').filter(function() {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('a').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 17,
                    Source: 'Tutorials Dojo',
                    Url: $(this).find('a').prop('href'),
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
            let url = `http://www.tutorialspoint.com/aurelia/`;
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
                    SubTopicsId: 17,
                    Source: 'Tutorials Point',
                    Url: `${`https://www.tutorialspoint.com/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async tutAurelia() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://tutaurelia.net/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.post-loop-content').filter(function () {
                mediaUrls.push({
                    PublishedAt: $(this).find('.posted-on').find('a').find('time').prop('datetime'),
                    Title: $(this).find('.entry-title').find('a').text().trim(),
                    Description: $(this).find('.entry-content').find('p').first().text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 17,
                    Source: 'Tut Aurelia',
                    Url: $(this).find('.entry-title').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

const aurelia = new Aurelia();
module.exports = aurelia;