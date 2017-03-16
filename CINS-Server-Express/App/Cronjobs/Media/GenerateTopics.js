const DB                =   require('../../Utils/DB');
const cheerio       =   require('cheerio');
const Utils = require('../../Utils/Utils');

class GenerateTopics {
    async getTopics() {
        let url =   `https://www.tutorialspoint.com/tutorialslibrary.htm`;
        let html    =   await Utils.request(url);
        let $   =   cheerio.load(html);
        let topics  =   [];
        $('body').find('.featured-box').filter(function() {
            let mainTopic   =   $(this).find('h4').first().text()
            if(!topics[mainTopic]) topics[mainTopic] = [];

        })
        console.log(topics)
    }
}

const generateTopics    =   new GenerateTopics();
generateTopics.getTopics();