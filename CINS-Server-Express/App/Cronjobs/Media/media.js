const moment            =   require('moment');
const DB                =   require('../../Utils/DB');
const TopicsModel       =   require('../../Models/TopicsModel');
const Logger            =   require('../../Utils/Logger');
const request           =   require('request');
const cheerio           =   require('cheerio');
const striptags         =   require('striptags');
const LanguageDetect    =   require('languagedetect');
const config            =   require('../../../config.json');
const C                 =   require('./SubTopics/C');
const Cpp               =   require('./SubTopics/Cpp');
const React             =   require('./SubTopics/React');
const ReactNative       =   require('./SubTopics/ReactNative');
const ES6               =   require('./SubTopics/ES6');
const Angular           =   require('./SubTopics/Angular');
const Foundation        =   require('./SubTopics/Foundation');
const Aurelia           =   require('./SubTopics/Aurelia');
const KoaJS             =   require('./SubTopics/KoaJS');
const JavaScript        =   require('./SubTopics/JavaScript');
const PHP               =   require('./SubTopics/PHP');
const Clojure           =   require('./SubTopics/Clojure');
const WebRTC            =   require('./SubTopics/WebRTC');

const GeneralArticles   =   require('./GeneralArticles');
const GeneralVideos     =   require('./GeneralVideos');

class Media {
    constructor() {
        this.subTopics  =   null;
        this.media      =   [];
    }
    async init() {
        this.subTopics  = this.subTopics || await TopicsModel.getAllTopics();
        this.setMedia(await GeneralArticles.reddit(this.subTopics));return;
        try {
            console.time('COMPLETED: ');
            //C
            this.setMedia(await C.drdobbs());

            //C++
            this.setMedia(await Cpp.isocpp());
            this.setMedia(await Cpp.msdn());
            this.setMedia(await Cpp.cppSoup());
            this.setMedia(await Cpp.cppTruth());
            this.setMedia(await Cpp.oldNewThing());
            this.setMedia(await Cpp.theViewFromAristeia());
            this.setMedia(await Cpp.herbSutter());
            this.setMedia(await Cpp.thinkingAsynchronouslyInCpp());
            this.setMedia(await Cpp.mrEdd());
            this.setMedia(await Cpp.ramblingComments());
            this.setMedia(await Cpp.attractiveChaos());
            this.setMedia(await Cpp.lightSleeper());
            this.setMedia(await Cpp.theFastwareProject());
            this.setMedia(await Cpp.theACCUOverloadJournals());
            this.setMedia(await Cpp.learningCpp());
            this.setMedia(await Cpp.bartoszMilewski());

            //React
            this.setMedia(await React.reactjsNews());
            this.setMedia(await React.reactjsNewsIO());
            this.setMedia(await React.reactjsNewsTwitter());
            this.setMedia(await React.scotch());
            this.setMedia(await React.codementor());
            this.setMedia(await React.tutorialzine());
            this.setMedia(await React.thinkster());
            this.setMedia(await React.thebluecoder());
            this.setMedia(await React.hashbangweekly());
            this.setMedia(await React.daveceddia());

            //React Native
            this.setMedia(await ReactNative.facebook());
            this.setMedia(await ReactNative.reactNativeNewsTwitter());
            this.setMedia(await ReactNative.facebookDocs());
            this.setMedia(await ReactNative.tutorialsPoint());

            //ES6
            this.setMedia(await ES6.es6Features());
            this.setMedia(await ES6.exploringjs());
            this.setMedia(await ES6.babel());
            this.setMedia(await ES6.qnimate());
            this.setMedia(await ES6.nczOnline());
            this.setMedia(await ES6.tutorialsPoint());
            this.setMedia(await ES6.mozilla());
            this.setMedia(await ES6.jsNext());
            this.setMedia(await ES6.youDontKnowJS());

            //Angular
            this.setMedia(await Angular.angular());
            this.setMedia(await Angular.angualrTwitter());
            this.setMedia(await Angular.blogspot());
            this.setMedia(await Angular.angularNews());
            this.setMedia(await Angular.tutorialsPoint());
            this.setMedia(await Angular.thoughtram());

            //Foundation
            this.setMedia(await Foundation.foundation());
            this.setMedia(await Foundation.foundationTutorials());
            this.setMedia(await Foundation.tutorialsPoint());

            // Aurelia
            this.setMedia(await Aurelia.aurelia());
            this.setMedia(await Aurelia.tutorialsDojo());
            this.setMedia(await Aurelia.tutorialsPoint());
            this.setMedia(await Aurelia.tutAurelia());

            // KoaJS
            this.setMedia(await KoaJS.tutorialsPoint());

            //JavaScript
            this.setMedia(await JavaScript.javascript());
            this.setMedia(await JavaScript.echoJs());
            this.setMedia(await JavaScript.jsOrg());
            this.setMedia(await JavaScript.jsLive());

            //PHP
            this.setMedia(await PHP.phpToday());
            this.setMedia(await PHP.planetPHP());
            this.setMedia(await PHP.zend());
            this.setMedia(await PHP.alltop());
            this.setMedia(await PHP.phpbuilder());
            this.setMedia(await PHP.tutorialsPoint());

            //Clojure
            this.setMedia(await Clojure.clojureNews());
            this.setMedia(await Clojure.planetClosure());

            //WebRTC
            this.setMedia(await WebRTC.webRtcWorld());

            //General Articles
            this.setMedia(await GeneralArticles.medium(this.subTopics));
            this.setMedia(await GeneralArticles.techbeacon(this.subTopics));
            this.setMedia(await GeneralArticles.infoq(this.subTopics));
            this.setMedia(await GeneralArticles.frontendFront(this.subTopics));
            this.setMedia(await GeneralArticles.infoWorld(this.subTopics));
            this.setMedia(await GeneralArticles.sitepoint(this.subTopics));
            this.setMedia(await GeneralArticles.reddit(this.subTopics));

            //General Video
            this.setMedia(await GeneralVideos.youtube());
            this.setMedia(await GeneralVideos.egghead(this.subTopics))

            console.timeEnd('COMPLETED: ')
        } catch (e) {
            console.log(e)
        }

    }

    setMedia(data) {
        for(let media of data) {
            this.insertMedia(media);
        }
    }

    async insertMedia(media) {
        media.PublishedAt   =   media.PublishedAt || moment().format()
        let data = [
            media.PublishedAt,
            striptags(media.Title),
            striptags(media.Description),
            media.ImageUrl || null,
            media.ImageWidth || null,
            media.ImageHeight || null,
            media.SubTopicsId,
            media.Source,
            media.Url,
            media.Type
        ];

        //Check for good parameters
        if(!media.Url || !media.Title || moment(new Date(media.PublishedAt)).format() == 'Invalid date' || media.Title.length > 100) {
            // console.log(media);
            return;
        };

        let lngDetector             =   new LanguageDetect(),
            languageDetect          =   lngDetector.detect(media.Title),
            languageDetectFilter    =   languageDetect.filter(languageDetail => languageDetail[0] === 'english');

        //Filter english characters
        if(!languageDetect || !languageDetectFilter || !languageDetectFilter[0] || !languageDetectFilter[0][1] > 0.1) return;

        const query = `INSERT INTO "CINS"."Media"
                                        ("PublishedAt", "Title", "Description", "ImageUrl", "ImageWidth", "ImageHeight", "SubTopicsId", "Source", "Url", "Type")
                                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
                                        ON CONFLICT ("Url") DO NOTHING returning *;`;
        try {
            let queryResult =   await DB.query(query, data);
            if(queryResult && queryResult.rowCount) {
                let lastInsertedId      =   queryResult.rows ? queryResult.rows[0].Id : null;
                if(lastInsertedId) {
                    //Insert to elasticsearch
                    let data    =   queryResult.rows[0];
                    await DB.ESquery('media', lastInsertedId, data)
                }
            }
        } catch (e) {
            console.log(e)
        }



    }
}

// var cron = new Media();
// cron.init();
module.exports  =   new Media();