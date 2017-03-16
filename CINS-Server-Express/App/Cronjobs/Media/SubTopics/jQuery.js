const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class jQuery {
    async jqueryRain() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.jqueryrain.com/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('#primary').find('.post').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.published').text(),
                    Title: $(this).find('.entry-title').find('a').text(),
                    Description: $(this).find('.entry-content').find('p').first().text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 26,
                    Source: 'jQuery Rain',
                    Url: $(this).find('.entry-title').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

const jquery = new jQuery();
module.exports = jquery;