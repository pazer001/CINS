const cheerio   =   require('cheerio');
const Utils     =   require('../../../Utils/Utils');
const moment    =   require('moment');
const fs        =   require('fs');

class ReactNative {
    constructor(subTopics) {
        this.topicName  =   'React Native';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async facebook() {
        let self    =   this;
        Utils.printFunctionName();
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
                    SubTopicsId: self.id,
                    Source: 'Facebook',
                    Url: `${`http://facebook.github.io/`}${$(this).find('header').find('h1').find('a').attr('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async reactNativeNewsTwitter() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://twitter.com/reactjsnews?lang=en`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.stream-container').find('.stream').find('ol').find('li').find('.tweet').find('.content').filter(function () {
                mediaUrls.push({
                    PublishedAt: `${$(this).find('.stream-item-header').find('.time').find('a').find('span').text()}, ${new Date().getFullYear()}`,
                    Title: $(this).find('.js-tweet-text-container').find('p').text().split('http')[0],
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'React Native News Twitter',
                    Url: $(this).find('.js-tweet-text-container').find('p').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async facebookDocs() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://facebook.github.io/react-native/docs/getting-started.html`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.nav-docs-section').find('li').filter(function () {
                if (!$(this).text()) return;
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('a').text().trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Facebook Docs',
                    Url: `${`https://facebook.github.io/react-native/`}${$(this).find('a').attr('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async tutorialsPoint() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://www.tutorialspoint.com/react_native/index.htm`;
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
                    SubTopicsId: self.id,
                    Source: 'Tutorials Point',
                    Url: `${`https://www.tutorialspoint.com/`}${$(this).prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

module.exports = ReactNative;