const cheerio       =   require('cheerio');
const moment        =   require('moment');
const fs            =   require('fs');
const parseString   =   require('xml2js').parseString;

const Utils = require('../../../Utils/Utils');

class Cpp {
    async isocpp() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://isocpp.org/blog/category/news`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.prettify').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.byline').text().trim().split('|')[1],
                    Title: $(this).find('.flush-bottom').find('a').text().trim(),
                    Description: $(this).find('.byline').next().text().trim(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: 'ISO CPP',
                    Url: $(this).find('blockquote').find('a').prop('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async msdn() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://blogs.msdn.microsoft.com/vcblog/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#main').find('.post-wrap').find('article').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.entry-meta').find('.post-info').find('.posted-on').find('time').prop('datetime'),
                    Title: $(this).find('.entry-header').find('h2').find('a').text().trim(),
                    Description: $(this).find('.entry-summary').find('p').text().trim().replace('Read more', ''),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: 'MSDN',
                    Url: $(this).find('.entry-header').find('h2').find('a').attr('href'),
                    Type: 'Article'
                }
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async cppSoup() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://feeds.feedburner.com/CppSoup`;
            let html = await Utils.request(url);
            if (!html) throw url;
            parseString(html, (err, result) => {
                if (err) throw url;
                result.rss.channel[0].item.forEach(item => {
                    let media = {
                        PublishedAt: item.pubDate.pop(),
                        Title: item.title.pop(),
                        Description: item.description.pop(),
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: 5,
                        Source: 'Cpp Soup',
                        Url: item.link.pop(),
                        Type: 'Article'
                    }
                    mediaUrls.push(media)
                })
            });

            resolve(mediaUrls);
        })
    }

    async cppTruth() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://cpptruths.blogspot.co.il/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.date-outer').filter(function () {

                let media = {
                    PublishedAt: $(this).find('.date-header').find('span').text(),
                    Title: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').text().trim(),
                    Description: $(this).find('.post-body').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: 'C++ truths',
                    Url: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').attr('href'),
                    Type: 'Article'
                }
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async oldNewThing() {
        Utils.printFunctionName();
        return new Promise(async function (resolve, reject) {
            let mediaUrls = [];
            let url = `https://blogs.msdn.microsoft.com/oldnewthing/`;
            try {
                let html = await Utils.request(url);
                if (!html) throw url;
                let $ = cheerio.load(html);
                $('#site-main').find('article').filter(function () {
                    let media = {
                        PublishedAt: $(this).find('.entry-footer').find('.posted-on').find('time').prop('datetime'),
                        Title: $(this).find('.entry-title').find('a').text().trim(),
                        Description: $(this).find('.entry-content').find('p').text(),
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: 5,
                        Source: 'The Old New Thing',
                        Url: $(this).find('.entry-title').find('a').prop('href'),
                        Type: 'Article'
                    }
                    if (!media.Title) return;
                    mediaUrls.push(media)
                });
                resolve(mediaUrls);
            } catch (e) {
                reject(e);
            }


        })
    }

    async theViewFromAristeia() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://scottmeyers.blogspot.co.il/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.date-outer').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.date-header').find('span').text(),
                    Title: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').text().trim(),
                    Description: $(this).find('.post-body').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: 'The View From Aristeia',
                    Url: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').attr('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });

            resolve(mediaUrls);
        })
    }

    async herbSutter() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://herbsutter.com/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#content-main').find('.type-post').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.posttitle').find('.postmetadata').text().split('by')[0].trim(),
                    Title: $(this).find('.posttitle').find('a').text().trim(),
                    Description: $(this).find('.entry').find('p').first().text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: `Sutters Mill`,
                    Url: $(this).find('.posttitle').find('a').prop('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async thinkingAsynchronouslyInCpp() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://blog.think-async.com/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.date-outer').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.date-header').find('span').text(),
                    Title: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').text().trim(),
                    Description: $(this).find('.post-body').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: 'Thinking Asynchronously in C++',
                    Url: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').attr('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async bartoszMilewski() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://bartoszmilewski.com/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.date-outer').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.date-header').find('span').text(),
                    Title: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').text().trim(),
                    Description: $(this).find('.post-body').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: `Bartosz Milewski Programming Cafe`,
                    Url: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').attr('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async mrEdd() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://www.mr-edd.co.uk/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#lifes_too_short').find('#leftcolumn').find('li').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.date').text().replace('[', '').replace(']', ''),
                    Title: $(this).find('a').text().trim(),
                    Description: null,
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: `Mr Edd`,
                    Url: `http://www.mr-edd.co.uk${$(this).find('a').attr('href')}`,
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async ramblingComments() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://www.lenholgate.com/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.entry-asset').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.published').prop('title'),
                    Title: $(this).find('.asset-header').find('h2').find('a').text().trim(),
                    Description: $(this).find('.asset-body').find('p').first().text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: `Rambling Comments`,
                    Url: $(this).find('.asset-header').find('h2').find('a').prop('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async attractiveChaos() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://attractivechaos.wordpress.com/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#content-main').find('.type-post').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.posttitle').find('.postmetadata').text().split('by')[0].trim(),
                    Title: $(this).find('.posttitle').find('a').text().trim(),
                    Description: $(this).find('.entry').find('p').first().text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: `Attractive Chaos`,
                    Url: $(this).find('.posttitle').find('a').prop('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async lightSleeper() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://pkisensee.wordpress.com/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('#content').find('.type-post').filter(function () {
                let media = {
                    PublishedAt: $(this).find('.entry-meta').find('.entry-date').text().trim(),
                    Title: $(this).find('.entry-title').find('a').text().trim(),
                    Description: $(this).find('.entry-content').find('p').first().text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: `Light Sleeper`,
                    Url: $(this).find('.entry-title').find('a').prop('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }

    async theFastwareProject() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://fastwareproject.blogspot.co.il/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.date-outer').filter(function () {

                let media = {
                    PublishedAt: $(this).find('.date-header').find('span').text(),
                    Title: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').text().trim(),
                    Description: $(this).find('.post-body').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: 'The Fastware Project',
                    Url: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').attr('href'),
                    Type: 'Article'
                }
                if (!media.Title) return;
                mediaUrls.push(media)
            });

            resolve(mediaUrls);
        })
    }

    async theACCUOverloadJournals() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `https://accu.org/index.php/journals/c370/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('a').each(async function() {
                let url     =   $(this).prop('href');
                if(!url.includes('journals')) return
                let page = await Utils.request(url);
                let $$  =   cheerio.load(page);
                $$('.journal-summary').each(async function() {
                    let media = {
                        PublishedAt: moment().format(),
                        Title: $(this).find('span').find('a').text().trim(),
                        Description: null,
                        ImageUrl: null,
                        ImageWidth: null,
                        ImageHeight: null,
                        SubTopicsId: 5,
                        Source: 'The ACCU Overload journals',
                        Url: $(this).find('span').find('a').prop('href'),
                        Type: 'Article'
                    }
                    if (!media.Title) return;
                    mediaUrls.push(media)
                })
            });

            setTimeout(() => resolve(mediaUrls), 10000);
        })
    }

    async learningCpp() {
        Utils.printFunctionName();
        return new Promise(async function (resolve) {
            let mediaUrls = [];
            let url = `http://learningcppisfun.blogspot.co.il/`;
            let html = await Utils.request(url);
            if (!html) throw url;
            let $ = cheerio.load(html);
            $('.date-outer').filter(function () {

                let media = {
                    PublishedAt: $(this).find('.date-header').find('span').text(),
                    Title: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').text().trim(),
                    Description: $(this).find('.post-body').text(),
                    ImageUrl: null,
                    ImageWidth: null,
                    ImageHeight: null,
                    SubTopicsId: 5,
                    Source: 'Learning C++',
                    Url: $(this).find('.date-posts').find('.post-outer').find('.post-title').find('a').prop('href'),
                    Type: 'Article'
                };
                if (!media.Title) return;
                mediaUrls.push(media)
            });
            resolve(mediaUrls);
        })
    }


}

const cpp = new Cpp();
module.exports = cpp;

