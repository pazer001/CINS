const cheerio = require('cheerio');
const Utils = require('../../../Utils/Utils');

class Angular {
    async angular() {
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://angular.io/news.html`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.article-card').filter(function() {
                if(!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: $(this).find('.date').text(),
                    Title: $(this).find('.title').find('a').text(),
                    Description: $(this).find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 2,
                    Source: 'Dr. Bobbs',
                    Url: $(this).find('.title').find('a').attr('href'),
                    Type: 'Article'
                })
            });
            console.log(mediaUrls)
            resolve(mediaUrls);
        })

    }
}

const angular = new Angular();
module.exports = angular;