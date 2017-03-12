const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class WebRTC {
    async webRtcWorld() {
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.webrtcworld.com/listall.aspx`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('#centerBox').find('h4').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('em').text(),
                    Title: $(this).find('a').text(),
                    Description: $(this).find('a').prop('title'),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 49,
                    Source: 'WebRTC World',
                    Url: $(this).find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

const webRTC = new WebRTC();
module.exports = webRTC;