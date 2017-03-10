const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class ApacheAnt {
    async apacheAnt() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://ant.apache.org/antnews.html`;
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
                    SubTopicsId: 109,
                    Source: 'Angular',
                    Url: $(this).find('.title').find('a').attr('href'),
                    Type: 'Article'
                })
            });

            resolve(mediaUrls);
        })
    }
}

const apacheAnt = new ApacheAnt();
module.exports = apacheAnt;