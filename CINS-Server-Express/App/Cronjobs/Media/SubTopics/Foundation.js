const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Foundation {
    async foundation() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://zurb.com/blog/archives`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.large-12').filter(function() {
                if(!$(this).text()) return;
                if($(this).find('.comment-author-line').find('p').text().split(' wrote this on ')[1]) {
                    var PublishedAt     =    $(this).find('.comment-author-line').find('p').text().split(' wrote this on ')[1].split('in')[0].trim();
                } else {
                    var PublishedAt     =   null;
                }
                mediaUrls.push({
                    PublishedAt: PublishedAt,
                    Title: $(this).find('.title').find('a').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 76,
                    Source: 'Foundation',
                    Url: $(this).find('.title').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async foundationTutorials() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://foundation.zurb.com/learn/tutorials.html`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.column').filter(function() {
                if(!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('a').find('h5').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 76,
                    Source: 'Foundation Tutorials',
                    Url: `https://foundation.zurb.com/learn/${$(this).find('a').prop('href')}`,
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
            let url = `http://www.tutorialspoint.com/foundation/`;
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
                    SubTopicsId: 76,
                    Source: 'Tutorials Point',
                    Url: `${`https://www.tutorialspoint.com/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

const foundation = new Foundation();
module.exports = foundation;