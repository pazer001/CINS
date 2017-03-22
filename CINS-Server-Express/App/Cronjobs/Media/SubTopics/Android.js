const cheerio   =   require('cheerio');
const moment    =   require('moment');
const Utils     =   require('../../../Utils/Utils');

class Android {
    constructor(subTopics) {
        this.topicName  =   'Android';
        this.id         =   subTopics.filter(subTopic => subTopic.Name === this.topicName)[0].Id;
    }
    async androidDeveloperNews() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://appdevelopermagazine.com/Android`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.newsbox_new').filter(function() {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('a').first().find('.newstitle').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Android Developer News',
                    Url: `https://appdevelopermagazine.com${$(this).find('a').first().prop('href')}`,
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async andevcon() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.andevcon.com/news`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.post-item').filter(function() {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('.post-header').find('h2').find('a').text(),
                    Description: $(this).find('.post-body').find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Andevcon',
                    Url: $(this).find('.post-header').find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async androidHeadlines() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://www.androidheadlines.com/category/app/android-developer-news`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.latest-story').filter(function() {
                mediaUrls.push({
                    PublishedAt: moment().format(),
                    Title: $(this).find('a').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Android Headlines',
                    Url: $(this).find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async androidPolice() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.androidpolice.com/topics/dev-development/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.post').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.timeago').prop('datetime'),
                    Title: $(this).find('.post-header').find('h2').find('a').text(),
                    Description: $(this).find('.post-content').text().replace('Read More', ''),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Android Police',
                    Url: $(this).find('.post-header').find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async androidDevelopers() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `https://android-developers.googleblog.com/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.date-outer').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('h2').find('span').text(),
                    Title: $(this).find('.date-posts').find('h3').find('a').text(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Android Developers',
                    Url: $(this).find('h3').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }

    async electronicsWeekly() {
        let self    =   this;
        Utils.printFunctionName();
        return new Promise(async function(resolve) {
            let mediaUrls   =   [];
            let url = `http://www.electronicsweekly.com/blogs/eyes-on-android/`;
            let html = await Utils.request(url);
            if(!html) throw url;
            let $   =   cheerio.load(html);
            $('.post-listing').find('article').filter(function() {
                mediaUrls.push({
                    PublishedAt: $(this).find('.post-meta').find('.tie-date').text(),
                    Title: $(this).find('h2').find('a').text(),
                    Description: $(this).find('.entry').find('p').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: self.id,
                    Source: 'Electronics Weekly',
                    Url: $(this).find('h2').find('a').prop('href'),
                    Type: 'Article'
                })
            });
            resolve(mediaUrls);
        })
    }
}

module.exports = Android;