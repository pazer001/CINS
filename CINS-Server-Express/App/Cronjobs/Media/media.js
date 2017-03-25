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
const jQuery            =   require('./SubTopics/jQuery');
const Erlang            =   require('./SubTopics/Erlang');
const Android           =   require('./SubTopics/Android');

const GeneralArticles   =   require('./GeneralArticles');
const GeneralVideos     =   require('./GeneralVideos');

class Media {
    constructor() {
        this.subTopics  =   null;
        this.media      =   [];
    }
    async init() {
        console.time('COMPLETED: ');
        try {
            this.subTopics  = this.subTopics || await TopicsModel.cronSubTopics();
            let android     =   new Android(this.subTopics.rows);
            let c           =   new C(this.subTopics.rows);
            let cpp         =   new Cpp(this.subTopics.rows);
            let react       =   new React(this.subTopics.rows);
            let reactNative =   new ReactNative(this.subTopics.rows);
            let es6         =   new ES6(this.subTopics.rows);
            let angular     =   new Angular(this.subTopics.rows);
            let foundation  =   new Foundation(this.subTopics.rows);
            let aurelia     =   new Aurelia(this.subTopics.rows);
            let koaJS       =   new KoaJS(this.subTopics.rows);
            let javaScript  =   new JavaScript(this.subTopics.rows);
            let php         =   new PHP(this.subTopics.rows);
            let clojure     =   new Clojure(this.subTopics.rows);
            let webRTC      =   new WebRTC(this.subTopics.rows);
            let jquery      =   new jQuery(this.subTopics.rows);
            let erlang      =   new Erlang(this.subTopics.rows);


            //C
            this.setMedia(await c.drdobbs());

            //C++
            this.setMedia(await cpp.isocpp());
            this.setMedia(await cpp.msdn());
            this.setMedia(await cpp.cppSoup());
            this.setMedia(await cpp.cppTruth());
            this.setMedia(await cpp.oldNewThing());
            this.setMedia(await cpp.theViewFromAristeia());
            this.setMedia(await cpp.herbSutter());
            this.setMedia(await cpp.thinkingAsynchronouslyInCpp());
            this.setMedia(await cpp.mrEdd());
            this.setMedia(await cpp.ramblingComments());
            this.setMedia(await cpp.attractiveChaos());
            this.setMedia(await cpp.lightSleeper());
            this.setMedia(await cpp.theFastwareProject());
            this.setMedia(await cpp.theACCUOverloadJournals());
            this.setMedia(await cpp.learningCpp());
            this.setMedia(await cpp.bartoszMilewski());

            //React
            // this.setMedia(await React.reactjsNews());
            // this.setMedia(await react.reactjsNewsIO());
            this.setMedia(await react.reactjsNewsTwitter());
            this.setMedia(await react.scotch());
            this.setMedia(await react.codementor());
            this.setMedia(await react.tutorialzine());
            this.setMedia(await react.thinkster());
            this.setMedia(await react.thebluecoder());
            this.setMedia(await react.hashbangweekly());
            this.setMedia(await react.daveceddia());

            //React Native
            this.setMedia(await reactNative.facebook());
            this.setMedia(await reactNative.reactNativeNewsTwitter());
            this.setMedia(await reactNative.facebookDocs());
            this.setMedia(await reactNative.tutorialsPoint());

            //ES6
            this.setMedia(await es6.es6Features());
            this.setMedia(await es6.exploringjs());
            this.setMedia(await es6.babel());
            this.setMedia(await es6.qnimate());
            this.setMedia(await es6.nczOnline());
            this.setMedia(await es6.tutorialsPoint());
            this.setMedia(await es6.mozilla());
            this.setMedia(await es6.jsNext());
            this.setMedia(await es6.youDontKnowJS());

            //Angular
            this.setMedia(await angular.angular());
            this.setMedia(await angular.angualrTwitter());
            this.setMedia(await angular.blogspot());
            // this.setMedia(await angular.angularNews());
            this.setMedia(await angular.tutorialsPoint());
            this.setMedia(await angular.thoughtram());

            //Foundation
            this.setMedia(await foundation.foundation());
            this.setMedia(await foundation.foundationTutorials());
            this.setMedia(await foundation.tutorialsPoint());

            // Aurelia
            this.setMedia(await aurelia.aurelia());
            this.setMedia(await aurelia.tutorialsDojo());
            this.setMedia(await aurelia.tutorialsPoint());
            this.setMedia(await aurelia.tutAurelia());

            // KoaJS
            this.setMedia(await koaJS.tutorialsPoint());

            //jQuery
            this.setMedia(await jquery.jqueryRain());

            //JavaScript
            this.setMedia(await javaScript.javascript());
            this.setMedia(await javaScript.echoJs());
            this.setMedia(await javaScript.jsOrg());
            this.setMedia(await javaScript.jsLive());

            //PHP
            this.setMedia(await php.phpToday());
            this.setMedia(await php.planetPHP());
            this.setMedia(await php.zend());
            this.setMedia(await php.alltop());
            this.setMedia(await php.phpbuilder());
            this.setMedia(await php.tutorialsPoint());

            //Clojure
            this.setMedia(await clojure.clojureNews());
            this.setMedia(await clojure.planetClosure());

            //WebRTC
            this.setMedia(await webRTC.webRtcWorld());

            //Erlang
            this.setMedia(await erlang.erlang());

            //Android
            this.setMedia(await android.androidDeveloperNews());
            this.setMedia(await android.andevcon());
            this.setMedia(await android.androidHeadlines());
            this.setMedia(await android.androidPolice());
            this.setMedia(await android.androidDevelopers());
            this.setMedia(await android.electronicsWeekly());

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

    fixMedia(media) {
        //Check for good parameters
        if(!media.Url || !media.Title || moment(new Date(media.PublishedAt)).format() == 'Invalid date' || media.Title.length > 100) {
            return;
        };

        //Filter images
        let notAllowedSites =   ['imgur', 'giphy'];
        for(let word of notAllowedSites) {
            if(media.Url.includes(word)) return;
        }

        //Filter english characters
        let lngDetector             =   new LanguageDetect(),
            languageDetect          =   lngDetector.detect(media.Title),
            languageDetectFilter    =   languageDetect.filter(languageDetail => languageDetail[0] === 'english');


        if(!languageDetect || !languageDetectFilter || !languageDetectFilter[0] || !languageDetectFilter[0][1] > 0.1) return;

        //Replace media type for youtube to video
        if(media.Url.includes('youtube')) media.Type = 'Video';

        //Reformat date
        media.PublishedAt   =   media.PublishedAt || moment().format()

        let data = [
            media.PublishedAt,
            striptags(media.Title),
            striptags(media.Description),
            media.SubTopicsId,
            media.Source,
            media.Url,
            media.Type
        ];

        return data;
    }

    async insertMedia(media) {
        let data    =   this.fixMedia(media);
        if(!data) return;

        const query = `INSERT INTO "CINS"."Media"
                                        ("PublishedAt", "Title", "Description", "SubTopicsId", "Source", "Url", "Type")
                                        VALUES($1, $2, $3, $4, $5, $6, $7) 
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