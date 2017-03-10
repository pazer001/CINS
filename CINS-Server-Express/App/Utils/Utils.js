const request   =   require('request');
const parseHtml =   require('cheerio');
class Utils {
    async request(url) {
        return new Promise((resolve, reject) => {
            request(url, (err, response, html) => {
                if(err) reject(err);
                resolve(html);
            })
        })
    }

    async parseHtml(html) {
        return new Promise((resolve, reject) => {
            resolve(parseHtml.load(html));
        })
    }

    printFunctionName() {
        let stack = new Error().stack,
            caller = stack.split('\n')[2].trim();
        console.log(caller.split(' ')[1]);
    }
}

const utils =   new Utils();
module.exports  =   utils;