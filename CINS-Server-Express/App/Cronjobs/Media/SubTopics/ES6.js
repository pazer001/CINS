const cheerio = require('cheerio');
const Utils = require('../../../Utils/Utils');
const moment    =   require('moment');
const fs        =   require('fs');

class ES6 {
    async facebook() {
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://facebook.github.io/react-native/blog/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.content').find('article').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: $(this).find('header').find('h4').find('time').text(),
                    Title: $(this).find('header').find('h1').find('a').text().trim(),
                    Description: $(this).find('.entry-content').text().trim(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 103,
                    Source: 'Facebook',
                    Url: `${`http://facebook.github.io/`}${$(this).find('header').find('h1').find('a').attr('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

const es6 = new ES6();
module.exports = es6;